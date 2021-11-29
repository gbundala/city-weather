import React from "react";
import renderer from "react-test-renderer";
import WeatherData from "./WeatherData";

// This article has been particularly helpful
// in groking the understanding of snapshot test
// in React applications
// https://www.digitalocean.com/community/tutorials/how-to-write-snapshot-tests-for-react-components-with-jest

// Mocking weatherData
// a sample of weather data to be used in the tests
// for when there is data in the weatherData prop
const weatherData = {
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

// snapshot test to match with the existing snapshot
// when there is weatherData
test("renders correctly when there is weatherData", () => {
  const tree = renderer
    .create(<WeatherData weatherData={weatherData} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// test to match the existing snapshot when there is
// no data
test("renders correctly when there is no weatherData", () => {
  const tree = renderer.create(<WeatherData />).toJSON();

  expect(tree).toMatchSnapshot();
});
