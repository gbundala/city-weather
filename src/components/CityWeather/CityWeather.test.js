import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import CityWeather from "./CityWeather";

// DOCS
// https://reactjs.org/docs/testing-recipes.html

// The React Docs provide elaborate details on how to test
// react components, in particular Data fetching
// More details in the comments below and implementation

let container = null;

// Setting up and tearing down of our React tree
// to isolate the effects of our tests to themselves
// https://reactjs.org/docs/testing-recipes.html#setup--teardown
beforeEach(() => {
  // setting up a DOM element as a render target
  container = document.createElement("div");

  // then appending the DOM el to the body tag
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting DOM element
  unmountComponentAtNode(container);
  container.remove();

  // re-assign the container variable with value 'null'
  container = null;
});

test("renders weather data correctly", async () => {
  // sample weatherData to be used as a mock
  const fakeWeatherData = {
    coord: {
      lon: 39.2695,
      lat: -6.8235,
    },
    weather: [
      {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03d",
      },
    ],
    base: "stations",
    main: {
      temp: 32.5,
      feels_like: 35.04,
      temp_min: 32.5,
      temp_max: 32.5,
      pressure: 1011,
      humidity: 49,
      sea_level: 1011,
      grnd_level: 1009,
    },
    visibility: 10000,
    wind: {
      speed: 6.64,
      deg: 115,
      gust: 7.03,
    },
    clouds: {
      all: 45,
    },
    dt: 1638008997,
    sys: {
      country: "TZ",
      sunrise: 1637981793,
      sunset: 1638026696,
    },
    timezone: 10800,
    id: 160263,
    name: "Dar es Salaam",
    cod: 200,
  };

  // mock the implementation of fetch
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeWeatherData),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  // rendering the component
  await act(async () => {
    render(<CityWeather />, container);
  });

  // assertions

  // assertion on the card title
  expect(container.getElementsByClassName("card-title h5")[0].textContent).toBe(
    `${fakeWeatherData.main.temp} °C`
  );

  // assertion on the card subtitle
  expect(
    container.getElementsByClassName("card-subtitle text-muted mb-2 h6")[0]
      .textContent
  ).toBe(`${fakeWeatherData.name} (${fakeWeatherData.sys.country})`);

  // assertions for the card texts
  expect(container.getElementsByClassName("card-text")[0].textContent).toBe(
    `Feels like: ${fakeWeatherData.main.feels_like} °C`
  );

  expect(container.getElementsByClassName("card-text")[1].textContent).toBe(
    `Max: ${fakeWeatherData.main.temp_max}°C ● Min: ${fakeWeatherData.main.temp_min}°C`
  );

  // assertions for the ListGroup Items
  expect(
    container.getElementsByClassName("list-group-item")[0].textContent
  ).toContain(`${fakeWeatherData.main.humidity}%`);

  expect(
    container.getElementsByClassName("list-group-item")[1].textContent
  ).toContain(`${fakeWeatherData.wind.speed} meter/sec`);

  expect(
    container.getElementsByClassName("list-group-item")[2].textContent
  ).toContain(`${fakeWeatherData.weather[0].description}`);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
