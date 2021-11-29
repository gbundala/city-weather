import React, { useEffect, useState } from "react";
import "./CityWeather.css";
import CitySelector from "../CitySelector/CitySelector";
import WeatherData from "../WeatherData/WeatherData";

/**
 *
 * The CityWeather component handles the data fetching logic
 * and all necessary business logic of managing state.
 * We also receive the API key and store it in the variable
 * APIKey to be used in the query URI for fetching the weather
 * data.
 *
 * Inside the useEffect dependency array we include the searchCity
 * state variable to trigger re-running of the effect when
 * the user clicks the Search button. It will also run after
 * the first initial render of the component.
 *
 * We then pass in the necessary variables and data to the
 * child components as well as dynamically render some components
 * and elements depending on the state
 *
 * We have also included the states for error and loading
 * to enhance the UX
 */

export default function CityWeather() {
  // state variables for handling the data
  // and for the various states
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [citySelection, setCitySelection] = useState("");
  const [searchCity, setSearchCity] = useState("");

  //   we pull the api key from the process varible
  const APIKey = process.env.REACT_APP_CITY_WEATHER_API_KEY;

  /**
   *
   * Research made: These articles below have been particularly
   * helpful in developing an intuition on calling an API
   * using React Hooks and managing the states
   * https://www.robinwieruch.de/react-hooks-fetch-data/
   * https://overreacted.io/a-complete-guide-to-useeffect/#why-usereducer-is-the-cheat-mode-of-hooks
   * https://reactjs.org/docs/hooks-effect.html
   * https://codesandbox.io/s/jvvkoo8pq3?file=/src/index.js
   * https://reactjs.org/docs/faq-ajax.html
   */

  useEffect(() => {
    // this variable is useful to determine when to set the
    // weatherData state variable. We therefore set the ignore
    // settting state variable to true in the return statement
    let ignoreSettingState = false;

    // fetching the data from the api and managing it

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${APIKey}&units=metric`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          if (!ignoreSettingState) setWeatherData(data);
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
        }
      );

    return () => {
      // set the variable to true in order not to setWeatherData
      // state variable when the component unmounts
      ignoreSettingState = true;
    };
  }, [searchCity, APIKey]);

  return (
    <div className="city-weather-wrapper">
      <h1>Weather data for your city</h1>
      <CitySelector
        setCitySelection={setCitySelection}
        citySelection={citySelection}
        setSearchCity={setSearchCity}
        setLoading={setLoading}
      />
      {weatherData && <WeatherData weatherData={weatherData} />}
      <p className="city-weather-message">
        {weatherData.cod === "404" && weatherData.message}
      </p>
      {loading && <p className="city-weather-message">Loading...</p>}
      {error && (
        <p className="city-weather-message">Error in fetching data: {error}</p>
      )}
    </div>
  );
}
