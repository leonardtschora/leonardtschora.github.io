# Cookbook — how this site is built

Personal site of Léonard Tschora. **Astro 7**, static output, built by **GitHub Actions**,
served by **GitHub Pages** at `https://leonardtschora.github.io/` (a *user site*, so it is
served from the domain root and needs no `base` path).

This file documents **the code**: what each file does and the recipe for each kind of
change. It does not document the content itself.

---

## 1. Map of the repository

| Path | What it is |
|---|---|
| `astro.config.mjs` | Astro config. Sets `site` (used for canonical URLs + sitemap) and enables `@astrojs/sitemap`. |
| `package.json` | Deps (`astro`, `@astrojs/sitemap`) and scripts (`dev`, `build`, `preview`). Requires Node ≥ 22.12. |
| `tsconfig.json` | Extends `astro/tsconfigs/strict`. Excludes `dist`. |
| `.github/workflows/deploy.yml` | The only CI. Builds on push to `master` and deploys to Pages. |
| `src/consts.ts` | **Single source of truth** for site identity, nav and social links. |
| `src/content.config.ts` | Defines the `publications` content collection and its frontmatter schema. |
| `src/layouts/BaseLayout.astro` | The HTML shell: `<head>`, meta/OG tags, header, `<main>`, footer. |
| `src/components/Header.astro` | Sticky top bar: brand, nav, résumé button. Scoped CSS inside. |
| `src/components/Footer.astro` | Social links + copyright. Scoped CSS inside. |
| `src/pages/*.astro` | One file = one route. See §3. |
| `src/content/publications/*.md` | One Markdown file = one publication. Frontmatter = metadata, body = abstract. |
| `src/styles/global.css` | Design tokens + base/reset + shared component classes. |
| `public/` | Copied verbatim to the site root. `public/files/` = PDFs, `public/images/` = images, favicons. |
| `dist/` | Build output. Git-ignored. Never edit, never commit. |
| `.astro/` | Generated types. Git-ignored. |
| `_pages/`, `_publications/` | **Dead.** Leftovers from the old Jekyll/AcademicPages site. Nothing reads them. |
| `MIGRATION.md` | Record of what the old Jekyll site contained, kept for reference. |

---

## 2. How a request becomes a page

```
src/pages/<name>.astro
      ↓ imports
BaseLayout.astro  ──imports──>  consts.ts (SITE)         → <title>, meta, OG, canonical
      │                          global.css              → tokens + shared classes
      ├──renders──> Header.astro ──> consts.ts (SITE, NAV)
      ├──renders──> <slot />   ← the page's own markup
      └──renders──> Footer.astro ──> consts.ts (SITE, SOCIALS)
```

`thesis.astro` additionally calls `getCollection('publications')` → reads
`src/content/publications/*.md` through the loader declared in `src/content.config.ts`.

Everything is rendered at build time. There is no client-side JavaScript and no runtime
server. `astro build` writes plain HTML into `dist/`.

---

## 3. Routes

Astro's file-based router turns `src/pages/x.astro` into `/x/`.

| File | URL |
|---|---|
| `src/pages/index.astro` | `/` — hero (avatar, tagline, CTAs) + short About section |
| `src/pages/experience.astro` | `/experience/` — hardcoded list of roles |
| `src/pages/education.astro` | `/education/` — hardcoded list of degrees |
| `src/pages/thesis.astro` | `/thesis/` — thesis page + `#publications` list from the collection |
| `src/pages/portfolio.astro` | `/portfolio/` — placeholder stub |
| `src/pages/404.astro` | `/404.html` — GitHub Pages serves it automatically on unknown paths |

Experience and Education are **static markup, not data-driven**. There is no `experience`
collection; each entry is an `<li class="entry">` written by hand in the `.astro` file.

---

## 4. The styling system

Three layers, in this order of preference when adding CSS:

1. **Tokens** — CSS custom properties on `:root` in `global.css`: `--bg`, `--bg-subtle`,
   `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-hover`,
   `--container`, `--radius`, `--shadow`, `--font-sans`, `--font-mono`.
   Dark mode is a second `:root` block under `@media (prefers-color-scheme: dark)` that
   **only redefines tokens** — no other rule is duplicated. Always use a token, never a
   literal colour.
2. **Shared classes** in `global.css`, reused across pages:
   - `.container` — max-width wrapper (`--container`), used by layout/header/footer.
   - `.prose` — narrower reading column (44rem) for text pages.
   - `.lead` — large muted intro paragraph.
   - `.button`, `.button.secondary` — call-to-action links.
   - `.entries` / `.entry` / `.entry-head` / `.period` / `.org` — the CV-entry pattern used
     by Experience, Education and the publication list.
   - `.badge` — award pill. `.pub-links` — inline link row. `details.abstract` — collapsible abstract.
3. **Scoped `<style>` blocks** inside a single `.astro` file, for CSS used by that file
   alone (Header, Footer, the `index.astro` hero). Astro scopes these automatically.

Rule of thumb: if two files would need the rule, put it in `global.css`; otherwise keep it
scoped.

---

## 5. Recipes

### Add a navigation entry
Edit `NAV` in `src/consts.ts` and create the matching `src/pages/<slug>.astro`. Use a
trailing slash in `href` (`'/slug/'`) — `Header.astro` normalises it for the
`aria-current="page"` highlight.

### Add a new page
Copy an existing page as the skeleton:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Page name" description="Optional; defaults to SITE.description.">
  <div class="prose">
    <h1>Page name</h1>
    …
  </div>
</BaseLayout>
```
`title` becomes `"<title> · Léonard Tschora"`. Omit it only on the home page.

### Add a publication
Drop a Markdown file in `src/content/publications/`:
```markdown
---
title: '…'          # required
venue: '…'          # required
date: 2024-01-17    # required
authors: '…'        # required
paperUrl: '/files/x.pdf'    # optional
slidesUrl: '/files/x.pdf'   # optional
doi: 'https://doi.org/…'    # optional, must be a valid URL
award: '…'                  # optional, renders a 🏆 badge
order: 1                    # optional, lower = shown first; missing → 999
---

Abstract goes here as the body.
```
The schema lives in `src/content.config.ts`; a field it does not declare fails the build.
Sorting in `thesis.astro` uses `order` only — always set it when inserting a paper.

### Add a CV entry (experience / education)
Edit the `.astro` file directly and copy an existing `<li class="entry">`. Keep the
structure: `.entry-head` holding an `<h3>` and a `<span class="period">`, then
`<p class="org">`, then a `<ul>` of bullets.

### Add a PDF or image
Put the file in `public/files/` or `public/images/` and link it with an absolute path
(`/files/name.pdf`). `public/` is copied as-is; do not import it.

### Change identity, email, résumé link, socials
`src/consts.ts` only. `SITE.resume` drives both the header button and the home CTA;
`SITE.avatar` drives both the home portrait and the Open Graph image.

### Change colours, spacing, typography
`src/styles/global.css`. Edit the token, not the usage. If you change a light token, check
whether the dark block needs the matching change.

---

## 6. Local development

```bash
npm ci            # or npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # static build into dist/
npm run preview   # serve dist/ exactly as Pages will
```
`npm run build` is also the type/content check: a bad frontmatter field, a broken import or
a TypeScript error fails it. **Always run it before pushing** — CI runs nothing else.

---

## 7. Deployment

`.github/workflows/deploy.yml`:

- Triggers on **push to `master`** and on manual `workflow_dispatch`.
- Job `build`: checkout, then `withastro/action@v3`, which installs deps from the lockfile,
  runs `astro build` and uploads `dist/` as the Pages artifact.
- Job `deploy`: `actions/deploy-pages@v4` publishes that artifact.
- `permissions: pages: write` + `id-token: write` are required for the OIDC deploy.
- `concurrency: pages` with `cancel-in-progress: false` — deploys queue rather than abort.

For this workflow to be the thing that publishes, the repository's **Pages source must be
set to "GitHub Actions"**, not "Deploy from a branch". Check it with:
```bash
gh api repos/leonardtschora/leonardtschora.github.io/pages --jq '.build_type, .source'
```
`build_type` must read `workflow`. If it reads `legacy`, Pages is still running the old
Jekyll build off a branch and ignoring this workflow entirely. Fix:
```bash
gh api -X PUT repos/leonardtschora/leonardtschora.github.io/pages \
  -f build_type=workflow
```

Watch a deploy: `gh run list -L 5` and `gh run watch`.

---

## 8. Traps

- **`dist/` is git-ignored but present on disk.** Never commit it, never hand-edit it; it is
  overwritten by every build.
- **`_pages/` and `_publications/` are dead Jekyll leftovers.** Editing them changes
  nothing. Real content lives in `src/pages/` and `src/content/publications/`.
- **No `base` path.** This is a user site at the root; adding `base` to `astro.config.mjs`
  would break every absolute link.
- **Trailing slashes.** Astro emits `/experience/index.html`. Link to `/experience/`, and
  keep the trailing slash in `NAV` so the active-link highlight works.
- **Dark mode is token-only.** Adding a hardcoded colour anywhere silently breaks it.
- **The sitemap needs `site`.** Removing `site` from `astro.config.mjs` breaks the sitemap
  and every canonical/OG URL.
- **Astro 7 content collections use `glob()` loaders**, not the legacy `src/content/config.ts`
  folder convention. The config file here is `src/content.config.ts` (no `/config/` folder).
