---
title: "Electricity Price Forecasting based on Order Books: a differentiable optimization approach"
collection: publications
permalink: /publication/dsaa
excerpt: 'This work was presented during the 10th IEEE International Conference on Data Science and Advanced Analytics
Conference.'
date: 2023-10-06
venue: 'DSAA 2023'
paperurl: '/files/dsaa.pdf'
slidesurl: '/files/dsaa-slides.pdf'
citation: 'Leonard Tschora, Tias Guns, Erwan Pierre, Marc Plantevit and Céline. Robardet, Electricity Price Forecasting based on Order Books: a differentiable optimization approach, 2023 IEEE 10th International Conference on Data Science and Advanced Analytics (DSAA), Thessaloniki, Greece, 2023, pp. 1-10, doi: 10.1109/DSAA60987.2023.10302542.'
---

We consider day-ahead electricity price forecasting on the European market. In this market, participants can offer electricity for sale or purchase for a specific price by submitting overnight orders. Market operators determine the market clearing price – the price at which the amount of electricity supplied equals the amount of electricity demanded – using the Euphemia balancing algorithm. EUPHEMIA is a quadratic optimization problem that maximizes the social welfare defined as the sum of the supplier surplus and consumer surplus while ensuring a null energy balance. This mechanism deeply influences the price calculation, but has so far been little considered in electricity price forecasting algorithms. Existing models are generally based on identifying relationships between exogenous characteristics (consumption and production forecasts) and the market clearing price to be predicted. A few studies have examined the EUPHEMIA mechanism during prediction, by doing costly manual transformations on order books. In this article, we overcome this limitation by considering the pricing mechanism during model training. For this, we use a predict-and-optimize strategy with differentiable optimization. We design a fully differentiable and scalable solving method for the EUPHEMIA optimization problem and apply it on real-life data from the European Power Exchange (EPEX). We design different model architectures using our differentiable solver and empirically study the impact of taking into account the optimal calculation of prices within the training of the neural network.
