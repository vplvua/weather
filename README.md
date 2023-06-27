# The Weather App

A web application that allows you to view weather forecasts for different cities. Only the current day's data is displayed.

Dropdown is used to select the city - this was a requirement of the test task. When you select a city, the weather forecast data changes.

Bootstrap library is used for design - the use of the library was also a requirement of the test task. However, I used the library for responsive design and used my own SCSS styles for styling.

Data is taken from the API https://www.tomorrow.io/ using HttpClient.

Weather information is cached in LocalStorage to reduce the number of API requests.

There is a possibility to choose units of measurement.

In addition to components, services, pipes, and the cusotm directive are used.

Angular CLI version 15.2.5
Bootstrap 5.3.0
TypeScript 4.9.4

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
