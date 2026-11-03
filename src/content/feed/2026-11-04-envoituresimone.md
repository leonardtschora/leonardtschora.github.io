---
title: "En voiture Simone: every fuel price in France, on one map"
date: 2026-11-04
summary: "A public map of today's fuel prices at every station in France, refreshed every hour from the official feed. Built and launched in a day."
link: https://simone.leonardtschora.com/
linkLabel: Open the map
---

Every station in France is a dot, green for cheap and red for dear, from the official
[prix-carburants feed](https://data.economie.gouv.fr/explore/dataset/prix-des-carburants-en-france-flux-instantane-v2/).
One download an hour replaces a query per visitor, and the app keeps a history of every
price change.

About one price in ten had not been updated for more than a week, and one of them, from
August 2025, came out as the cheapest in Paris. Prices older than seven days are left out.
Next: the cheapest refill near you, counting the drive there.
[Source](https://github.com/TschorAI/envoituresimone) · [how it was built](/work/#envoituresimone).
