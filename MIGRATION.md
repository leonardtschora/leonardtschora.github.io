# Site rewrite — migration spec

Rebuilding this site on **Astro**, built by **GitHub Actions** and hosted free on
**GitHub Pages** (repo `leonardtschora/leonardtschora.github.io`, a user site → served at
`https://leonardtschora.github.io/`, no `baseurl`).

This file captures everything worth preserving from the old Jekyll/AcademicPages template
before its config/data files were deleted. Old content markdown (pages, publications) and
the PDFs in `files/` are kept in the repo and will be migrated into the Astro `src/`.

## Site identity
- **Name:** Léonard Tschora
- **URL:** https://leonardtschora.github.io/ (baseurl: none)
- **Repo:** leonardtschora/leonardtschora.github.io
- **Tagline / bio:** "Ph.D. in Computer Science | Expert in Energy Market Analytics |
  Machine Learning Engineer Specializing in Electricity Price Forecasting & Predictive Modeling"
- **Locale:** en-US

## Author profile (was `_config.yml` → author:)
- Avatar: `images/profil.jpg`
- Location: Framingham
- Employer: INSA Lyon
- Public email: leonard.tschora@protonmail.com  (account email on file: tschoraton@pm.me)

### Links (only the populated ones)
- Google Scholar: https://scholar.google.com/citations?user=O-R4mTsAAAAJ&hl=en&oi=sra
- GitHub: https://github.com/leonardtschora
- LinkedIn: https://www.linkedin.com/in/léonard-tschora-220132194
- (all other academic/social fields in the old config were blank)

## Navigation (was `_data/navigation.yml`)
1. Home        → /about/     (about.md)
2. Resume      → /resume/    (resume.md, + PDF)
3. Experience  → /experience/
4. Education   → /education/
5. Publications→ /publications/
6. My thesis   → /thesis/
7. Hobbies     → /hobbies/

## Content inventory (preserved for migration)
### Pages — `_pages/`
- about.md, resume.md, experience.md, education.md, publications.md, thesis.md, hobbies.md
- 404.md (kept for a custom 404)

### Publications — `_publications/` (all real; filenames are template-style but content is real)
- EPF — "Electricity price forecasting on the day-ahead market using machine learning",
  Applied Energy 2022. PDF: files/EPF.pdf
- IDA — "Forecasting electricity prices: An optimize then predict-based approach",
  IDA 2023 (frontier prize / best paper). PDF: files/ida.pdf
- DSAA — "Electricity Price Forecasting based on Order Books: a differentiable optimization
  approach", DSAA 2023. PDF: files/dsaa.pdf, slides: files/dsaa-slides.pdf

### Files — `files/`
- resume_leonard_tschora.pdf, thesis.pdf, defence.pdf (defence slides),
  EPF.pdf, ida.pdf, dsaa.pdf, dsaa-slides.pdf,
  "Letter of recommendation - Merck.pdf", fee.jpg

### Images kept
- profil.jpg (avatar), profile.png, site-logo.png, favicon.ico

## Settings that were OFF (don't need to port)
- Comments: disabled (no provider)
- Analytics: disabled
- Talk map / talks / teaching: unused features, removed
- Blog: none (all archive/tag/category/year pages removed)
