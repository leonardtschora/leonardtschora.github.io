---
layout: archive
title: "Thesis"
permalink: /thesis/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Machine Learning techniques for Electricity Price Forecasting [PDF](/files/thesis.pdf)
======

## Downloads

[Thesis Manuscript](/files/thesis.pdf)
[Defence slides](/files/defence.pdf)

The defence was open to the public and was filmed. The [video is available here](https://www.youtube.com/live/Stj9HCPnH7g?si=Ta0hoN0RIBp3b4ER&t=226).

## Background

I started this thesis following my research internship at [elmy](https://elmy.fr/) ([check here for more information](/experience/)). This thesis was a collaboration between the [Liris laboratory](https://liris.cnrs.fr/) (INSA Lyon) and elmy. As part of the [DM2L research team](https://projet.liris.cnrs.fr/dm2l/), I was mentored by [Céline Robardet](https://perso.liris.cnrs.fr/celine.robardet/) and [Marc Plantevit](https://www.lrde.epita.fr/wiki/User:Marc).

## Abstract

Electricity is essential for the energetic transition due to the diversity of greenhouse-gas free
means of production and its potential to replace fossil fuels in transportation, heating and
industries. However, it requires a constant balance between generation and consumption to
maintain intensity in the network, and it can’t be stored efficiently. It is then necessary to use
Price Fixing Algorithm (PFA) for developing competitive markets. Daily, the European PFA
EUPHEMIA determines the prices for the next day in Europe, called the Day-Ahead prices,
that maximize the Social Welfare, while maintaining energy balance. Unlike other purely
speculative markets, the Day-Ahead prices is algorithmically computed. Forecasting them
is thus a unique and challenging task.
This introduces the problem of Electricity Price Forecasting (EPF) at the European scale,
that consists in predicting the 24 hourly prices for each market before their fixation at
12am. The literature highlights two approaches: Expert Models, that aim at replicating the
PFA and computing the prices based on estimates of the inputs of EUPHEMIA, and Data
Driven methods that directly estimate prices using exogenous variables and past prices.
Both approaches are incomplete: Expert Models approaches are theoretically appealing but
fail to produce accurate forecasts in practice. Conversely, Data Driven approaches lack
transparency, lowering the forecasts reliability. Also, the true relationship between variables
and prices is only captured by EUPHEMIA, implicitly limiting the performances of Data
Driven approaches.
This thesis addresses those limitations. The first challenge is to produce accurate and
explainable models for a given market. We achieve the former by extending methodologies
from the literature, while we use Shap Values, a model-agnostic explainability tool, for
the latter. Then, we build a multi-market forecasting model by representing the European
network as a graph where each market is a node labeled with its prices. Graph edges
are connection lines between markets, and we estimate the cross-market flows using an
optimization problem prior to training. Lastly, we combine the EUPHEMIA algorithm with
in a Neural Network (NN) that forecasts its inputs. To consider the price forecasting error
in the NN’s training, we compute the gradient of EUPHEMIA’s output with respect to its
input, by vanishing the derivative of the dual function using a dichotomy search.
We believe this thesis will be beneficial for the EPF practitioners and will contribute
toward bridging the gap between Expert Models and Data Driven approaches. We also
believe that our work on mixing optimization problems with machine learning models will
benefit the broader scientific community.



