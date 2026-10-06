# How urbanmorph.com is built and deployed

## The short version

| | |
|---|---|
| Live site | https://www.urbanmorph.com |
| Served by | Cloudflare Worker `urbanmorph` (static assets from `dist/`) |
| Production branch | **`astro`** (the repository's default branch) |
| Deploys when | anything is pushed to `astro`, automatically, via GitHub Actions |
| Preview URL | https://urbanmorph.knerav.workers.dev |

Push to `astro` and the site updates. Nothing else deploys.

## Branches, and the trap

This repository holds two separate sites with no shared history:

- **`astro`** — this site. Astro, built to `dist/`, deployed to the Worker. **This is production.**
- **`master`** — the retired hand-written Jekyll site (`index.html`, `synthesys.html`, `_config.yml`).
  GitHub Pages is switched off and the domain points at Cloudflare, so editing files there changes
  nothing on the live site. Its README carries the same warning.

If you edited `synthesys.html` or another `.html` file at the repository root, you were on `master`
and the change will not appear. The same content lives under `src/` on `astro`:

| Old file on `master` | Where it lives now on `astro` |
|---|---|
| `synthesys.html` | `src/pages/synthesys.astro` + `src/data/synthesys.json` |
| `index.html` | `src/pages/index.astro` + `src/lib/site.ts` |
| `projects.html` | `src/pages/projects.astro` + `src/data/projects.json` |
| `news_articles.html` | `src/pages/media.astro` + `src/data/media.json` |
| `blog/*.html` | `src/content/blog/*.md` |
| `llms.txt` | `public/llms.txt` |

Most content changes are data, not code: add a data story to `src/data/synthesys.json`, a project to
`src/data/projects.json`, a person to `src/data/team.json`. Counts in the page copy derive from the
data, so they stay correct on their own.

## Deploying

**Normal:** commit on `astro` and push. GitHub Actions builds and deploys, then smoke-tests the live URLs.
Watch it at https://github.com/urbanmorph/urbanmorph/actions

**Manual:** Actions → Deploy → Run workflow (any branch). Useful to redeploy without a code change.

**From a laptop**, if ever needed:

```sh
cd ~/GitHub/urbanmorph-astro
npm run build && npx wrangler deploy
```

That needs `CLOUDFLARE_API_TOKEN` in the environment. Run it from this directory; the old checkout at
`~/GitHub/urbanmorph` has no `package.json` or `wrangler.jsonc` and any deploy from there will fail.

## What CI needs

Two repository secrets, already set:

- `CLOUDFLARE_API_TOKEN` — Workers Scripts: Edit on the UrbanMorph account
- `CLOUDFLARE_ACCOUNT_ID`

Pull requests build but never deploy, so a fork cannot reach the secrets.

## DNS and domains

See `CUTOVER.md`. In short: `urbanmorph.com` and `urbanmorph.in` are Cloudflare zones,
`www.urbanmorph.com` is the Worker's custom domain, the apex and the `.in` domain redirect to it.
