# Do I need and Umbrella
## WIP

Website that tells you if you need and umbrella and sends you a daily notification to remind you

## Objective:

* Create a full stack website that checks https://openweathermap.org and tells the user if they should take an umbrella with them today
* Use node && typescript && react
* Have tests (and lining)
* Have UI tests
* Have a pipeline for it
* Use a TDD approach

## Taks:

* [DOING] Create some integration test for an endpoint that returns a boolean telling you if you need an umbrella. Mock the fetch to https://openweathermap.org for this
    * [DOING] Add TS
    * [DOING] Set up Jest
    * [TODO] Set up nock
    * [TODO] Spin up everything an test it
* [TODO] Create the code in a TDD way
    * [TODO] Add linting
    * [TODO] Do the controller
    * [TODO] Do the service
    * [TODO] Do the client
* [TODO] Once the BE is finished create a simple react app that consumes the endpoint (in a TDD way)
* [TODO] Extend it display also the next day
* [TODO] Extend it have notifications
* [TODO] Add UI tests
* [TODO] Use some kind of pipeline
* [TODO] Upload it somewhere
