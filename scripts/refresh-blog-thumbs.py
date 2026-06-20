#!/usr/bin/env python3
"""Self-host remote blog thumbnails.

Scans HTML files for remote Medium image URLs (cdn-images-1.medium.com and
miro.medium.com), downloads each, converts it to an optimized WebP under
img/blog/thumbs/, and rewrites the <img src> references to the local file.

This removes third-party cookies / requests from the blog (the thing that
tanked its Lighthouse "Best Practices" score) and speeds the page up.

Idempotent: a thumbnail already present locally is reused, so re-running after
publishing a new Medium post only fetches the *new* images. Downloads that fail
(e.g. an image Medium has removed) are reported and left untouched, so the page
keeps working via its existing onerror fallback.

Usage:
    scripts/refresh-blog-thumbs.py                 # process blog.html
    scripts/refresh-blog-thumbs.py blog.html news_articles.html
    scripts/refresh-blog-thumbs.py --force         # re-download everything
    scripts/refresh-blog-thumbs.py --dry-run       # list what would change

Options:
    --dir DIR          output directory for thumbnails (default: img/blog/thumbs)
    --max-width N      downscale wider images to N px (default: 800)
    --quality N        WebP quality 1-100 (default: 80)
    --force            re-download even if the local thumbnail exists
    --dry-run          report findings without downloading or editing files

Requires: curl and ImageMagick (`magick` or `convert`) on PATH.
"""
import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
MEDIUM_RE = re.compile(r'https?://(?:cdn-images-1|miro)\.medium\.com/[^"\'\s)]+')
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36")


def rel_to_root(p: Path) -> str:
    """Display path relative to the repo root, or absolute if it lives elsewhere."""
    try:
        return p.resolve().relative_to(REPO_ROOT).as_posix()
    except ValueError:
        return str(p)


def find_magick() -> str:
    for cmd in ("magick", "convert"):
        if shutil.which(cmd):
            return cmd
    sys.exit("ERROR: ImageMagick not found. Install it (`brew install imagemagick`).")


def local_name(url: str) -> str:
    """Stable, collision-free filename derived from the Medium image hash."""
    base = url.split("?")[0].rstrip("/").split("/")[-1]
    stem = re.sub(r"\.[A-Za-z0-9]+$", "", base)       # drop extension
    stem = re.sub(r"[^A-Za-z0-9_-]", "_", stem)        # sanitize (Medium uses '*')
    return f"{stem}.webp"


def download(url: str, dest: Path) -> bool:
    return subprocess.run(
        ["curl", "-fsSL", "-A", UA, "--max-time", "30", url, "-o", str(dest)],
    ).returncode == 0


def to_webp(magick: str, src: Path, dest: Path, max_width: int, quality: int) -> bool:
    return subprocess.run(
        [magick, str(src), "-resize", f"{max_width}x>", "-strip",
         "-quality", str(quality), str(dest)],
    ).returncode == 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="*", default=["blog.html"],
                    help="HTML files to process (default: blog.html)")
    ap.add_argument("--dir", default="img/blog/thumbs", help="thumbnail output dir")
    ap.add_argument("--max-width", type=int, default=800)
    ap.add_argument("--quality", type=int, default=80)
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    magick = find_magick()
    out_dir = (REPO_ROOT / args.dir)
    tmp_dir = REPO_ROOT / ".thumb-tmp"
    if not args.dry_run:
        out_dir.mkdir(parents=True, exist_ok=True)
        tmp_dir.mkdir(parents=True, exist_ok=True)

    # 1) collect unique remote URLs across all target files
    targets = []
    for f in args.files:
        p = (REPO_ROOT / f) if not Path(f).is_absolute() else Path(f)
        if not p.exists():
            print(f"skip (not found): {f}")
            continue
        targets.append(p)

    html_by_file = {p: p.read_text(encoding="utf-8") for p in targets}
    urls = sorted({u for html in html_by_file.values() for u in MEDIUM_RE.findall(html)})

    if not urls:
        print("No remote Medium images found — nothing to do. ✅")
        return 0

    print(f"Found {len(urls)} unique remote image(s) across {len(targets)} file(s).")

    # 2) download + convert (idempotent), build url -> local path map
    url_map, failed = {}, []
    for url in urls:
        webp = out_dir / local_name(url)
        rel = webp.relative_to(REPO_ROOT).as_posix()
        if webp.exists() and not args.force:
            url_map[url] = rel
            print(f"  reuse   {rel}")
            continue
        if args.dry_run:
            print(f"  WOULD fetch  {url}  ->  {rel}")
            url_map[url] = rel
            continue
        tmp = tmp_dir / (local_name(url) + ".bin")
        if download(url, tmp) and to_webp(magick, tmp, webp, args.max_width, args.quality):
            url_map[url] = rel
            print(f"  fetched {rel}")
        else:
            failed.append(url)
            print(f"  FAILED  {url}  (left as-is)")
        tmp.unlink(missing_ok=True)

    # 3) rewrite HTML references (only for successfully localized URLs)
    edited = 0
    for p, html in html_by_file.items():
        new = html
        for url, rel in url_map.items():
            new = new.replace(f'"{url}"', f'"{rel}"')
        if new != html and not args.dry_run:
            p.write_text(new, encoding="utf-8")
            edited += 1
            print(f"  updated {rel_to_root(p)}")

    if not args.dry_run:
        shutil.rmtree(tmp_dir, ignore_errors=True)

    print(f"\nDone. localized={len(url_map)} "
          f"failed={len(failed)} files_updated={edited}")
    if failed:
        print("Failed downloads (still remote — check the URLs or replace manually):")
        for u in failed:
            print(f"  {u}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
