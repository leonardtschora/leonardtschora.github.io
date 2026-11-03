---
title: "Yes we kanji moves to Google Cloud"
date: 2026-10-29
summary: "The kanji app now generates themes on the fly with Gemini and BigQuery vector search, on Cloud Run."
link: https://yeswekanji.leonardtschora.com/
linkLabel: Open the app
---

Type any theme and get ten matching kanji cards. Gemini checks and expands the theme,
BigQuery `VECTOR_SEARCH` retrieves 30 candidates, Gemini picks ten, and code rejects
anything outside the candidates. On a 10-theme test set run three times, that check took
the pass rate from 21/30 to 30/30.
[Source](https://github.com/TschorAI/yeswekanji-gcp) · [how it was built](/work/#yeswekanji).
