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
| `astro.config.mjs` | Astro config. Sets `site` (used for canonical URLs + sitemap), enables `@astrojs/sitemap`, and declares the `redirects` for the three retired URLs. |
| `package.json` | Deps (`astro`, `@astrojs/sitemap`) and scripts (`dev`, `build`, `preview`). Requires Node ≥ 22.12. |
| `tsconfig.json` | Extends `astro/tsconfigs/strict`. Excludes `dist`. |
| `.github/workflows/deploy.yml` | The only CI. Builds on push to `master` and deploys to Pages. |
| `src/consts.ts` | **Single source of truth** for site identity, nav and social links. |
| `src/layouts/BaseLayout.astro` | The HTML shell: `<head>`, meta/OG tags, header, `<main>`, footer. |
| `src/components/Header.astro` | Sticky top bar: brand + nav. Scoped CSS inside. No résumé button — the CV is linked once, from `/about/`. |
| `src/components/Footer.astro` | Social links + copyright. Scoped CSS inside. |
| `src/pages/*.astro` | One file = one route. See §3. |
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

There are **no content collections**. Every page is hand-written markup; the `publications`
collection and `src/content/` were deleted with `/thesis/` (September 2026) — the list of
four references now lives as plain markup in `about.astro`.

Everything is rendered at build time. There is no client-side JavaScript and no runtime
server. `astro build` writes plain HTML into `dist/`.

---

## 3. Routes

Astro's file-based router turns `src/pages/x.astro` into `/x/`.

| File | URL |
|---|---|
| `src/pages/index.astro` | `/` — hero (avatar, credential chips, H1, lead, CTAs), "What I do" (three service cards, each with an icon), "Three applications you can check" (three linked app cards), closing CTA |
| `src/pages/work.astro` | `/work/` — three project cards (heading, one-liner, stat row, decision, link row), then the two closing sections. Hand-written markup; card CSS is scoped in the file. Each `<article class="project">` carries an `id` (`yeswekanji`, `gengiscan`, `chocacao`) — the home page's app cards link to `/work/#<id>`, so **do not rename them**. `.project` has `scroll-margin-top` so the sticky header does not cover the card. |
| `src/pages/about.astro` | `/about/` — profile, research, publications, education, CV link |
| `src/pages/experience.astro` | `/experience/` — hardcoded list of roles |
| `src/pages/contact.astro` | `/contact/` — CTA + plain contact lines. No form. |
| `src/pages/404.astro` | `/404.html` — GitHub Pages serves it automatically on unknown paths |

Every page is **static markup, not data-driven**: each CV entry is an `<li class="entry">`
written by hand in the `.astro` file.

**Retired URLs**, kept alive as redirects declared in `astro.config.mjs` (the static build
emits a meta-refresh `index.html` for each; they are excluded from the sitemap):

| Old URL | Redirects to |
|---|---|
| `/thesis/` | `/about/` |
| `/education/` | `/about/` |
| `/portfolio/` | `/work/` |

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
     by Experience and the service cards on the home page.
   - `.stats` / `.stat` / `.stat-value` / `.stat-label` — compact row of pulled-out
     figures (value above label). Wraps at narrow widths. Used by the project cards on
     `/work/`.
   - `.badge` — award pill. `.pub-links` — inline link row. `details.abstract` — collapsible
     abstract. (These three are unused since the September 2026 rewrite except `.pub-links`,
     which `/about/` uses for the thesis link row.)
3. **Scoped `<style>` blocks** inside a single `.astro` file, for CSS used by that file
   alone (Header, Footer, the `index.astro` hero, the `.project` card cluster in
   `work.astro`, the list tweaks on `/about/` and `/contact/`). Astro scopes these
   automatically.

   The home page's scoped block also holds two clusters worth knowing about:
   `.creds` / `.cred` / `.cred-value` / `.cred-label` — the credential chips under the
   portrait, a deliberate sibling of the `.stat` family (same border, `--bg-subtle`,
   `--radius`); and `.app-cards` / `.app-card` — the three app cards, where the whole card
   is a single `<a>` (`display: flex`, `height: 100%`, hover lifts the border to
   `--accent`).

   **Icons are inline SVG, never an icon font, an emoji or a dependency.** The convention:
   `viewBox="0 0 24 24"`, `width="1em" height="1em"` on the element, `fill="none"`,
   `stroke="currentColor"`, `stroke-width="1.75"`, round caps and joins, `aria-hidden="true"`,
   and a one-line comment saying what the shape depicts. CSS then sizes them (`width`/`height`
   `2em`, `flex: none`) and colours them with `color: var(--accent)`, so they follow the text
   and switch with the theme for free. The `width`/`height` attributes matter: an SVG with a
   `viewBox` and no intrinsic size fills its container if the CSS ever fails to apply.

   The `/work/` cards reserve a screenshot slot: an `<img class="project-shot" …>` as the
   first child of an `<article class="project">` renders full card width at **16:9**
   (`object-fit: cover`). The rule exists; no image uses it yet.

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
Add an `<li>` to the `<ul class="pubs">` under the *Publications* heading in
`src/pages/about.astro`. There is no collection and no schema — it is plain markup.

### Retire a URL
Add an entry to `redirects` in `astro.config.mjs` (`'/old': '/new/'`, no trailing slash on
the key) and delete the page. Check the built `dist/old/index.html` contains a
`<meta http-equiv="refresh">`.

### Change the booking link

`SITE.booking` in `src/consts.ts` — one constant, four consumers: the hero and closing CTAs on
`/`, the closing CTA on `/work/`, the primary button on `/contact/`, and the inline
"book thirty minutes" link in `/about/`. Change it there and every CTA follows.

It currently points at a Proton Calendar booking page. That URL carries its payload in a
**fragment** (`#…`), including `--` and a trailing `=`; keep it verbatim and never URL-encode
it. All four links open in a new tab (`target="_blank" rel="noopener"`), because a booking
flow that replaces the site loses the reader.

### Add a CV entry (experience / education)
Edit the `.astro` file directly and copy an existing `<li class="entry">`. Keep the
structure: `.entry-head` holding an `<h3>` and a `<span class="period">`, then
`<p class="org">`, then a `<ul>` of bullets.

### Add a PDF or image
Put the file in `public/files/` or `public/images/` and link it with an absolute path
(`/files/name.pdf`). `public/` is copied as-is; do not import it.

### Change identity, email, résumé link, socials
`src/consts.ts` only. `SITE.resume` is linked from `/about/` only (there is deliberately no
résumé button in the header); `SITE.avatar` drives both the home portrait and the Open Graph
image.

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
- **`node-version: 22` is pinned on that action and must stay pinned.** The action's default is
  Node 20, not the latest LTS, and Astro 7 requires ≥22.12.0. It fails at *build* time with
  "Node.js v20.x is not supported by Astro", after a successful install, so the first sign of
  trouble is a red deploy. Keep it in step with `engines.node` in `package.json`.
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
  nothing. Real content lives in `src/pages/`.
- **No `base` path.** This is a user site at the root; adding `base` to `astro.config.mjs`
  would break every absolute link.
- **Trailing slashes.** Astro emits `/experience/index.html`. Link to `/experience/`, and
  keep the trailing slash in `NAV` so the active-link highlight works.
- **Dark mode is token-only.** Adding a hardcoded colour anywhere silently breaks it.
- **The sitemap needs `site`.** Removing `site` from `astro.config.mjs` breaks the sitemap
  and every canonical/OG URL.
- **No content collections.** `src/content.config.ts` and `src/content/` were deleted with
  `/thesis/`. If one is ever reintroduced, Astro 7 uses `glob()` loaders declared in
  `src/content.config.ts` (no `/config/` folder).
- **No job-seeker surface.** No résumé button in the header, no `employer` field in
  `consts.ts` — both were removed on purpose in the September 2026 rewrite.
