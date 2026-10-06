# Archived: this branch is not the website

The live site at **https://www.urbanmorph.com** is **not** built from this branch.

This `master` branch holds the retired hand-written Jekyll site: `index.html`, `synthesys.html`,
`projects.html`, `blog/*.html`, `_config.yml` and so on. It was replaced in September 2026.
GitHub Pages is switched off and the domain points at Cloudflare, so **editing any file here changes
nothing that anyone can see.**

## Where to make changes instead

The live site is on the **`astro`** branch, and pushing to it deploys automatically.

```sh
cd ~/GitHub/urbanmorph-astro      # the astro branch worktree
# edit, commit, push — GitHub Actions builds and deploys
```

Read `DEPLOY.md` on that branch for the full picture. The short map:

| Old file here | Where that content lives now |
|---|---|
| `synthesys.html` | `src/data/synthesys.json` and `src/pages/synthesys.astro` |
| `index.html` | `src/lib/site.ts` and `src/pages/index.astro` |
| `projects.html` | `src/data/projects.json` |
| `news_articles.html` | `src/data/media.json` |
| `blog/*.html` | `src/content/blog/*.md` |
| `llms.txt` | `public/llms.txt` |

This branch is kept only as history.

---

## Original README, kept for the record

# Urban Morph
## Defining Urban Spaces
* Data Science
* Behavioural Science
* Energy & Mobility
### [Find out about it all](https://urbanmorph.github.io/urbanmorph/)
