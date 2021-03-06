# Do I need an Umbrella
[![Actions Status](https://github.com/jucallej/Do-I-need-an-Umbrella/workflows/ci/badge.svg)](https://github.com/jucallej/Do-I-need-an-Umbrella/actions)

## Introduction

Should you use an umbrella today?

## Tech stack:

* Full stack website that uses `Node.js` && `React` (with `Express.js` && `TypeScript`)
* Fetches information from a 3rd party API using an API key (OpenWeatherMap)
* Has tests using `Jest` with `Enzyme` && `SuperTest` && `Nock`
* Has a CI (`GitHub Actions`) where it runs the test before merging a PR and when merged it pushed the BE to AWS `Lambdas` using the `Serverless` framework
* Uses secrets to push to AWS and to fetch from OpenWeatherMap using environmental variables
* Created using TDD

## [Future enhancements](https://github.com/jucallej/Do-I-need-an-Umbrella/projects)
