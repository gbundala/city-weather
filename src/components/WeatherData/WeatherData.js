import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import "./WeatherData.css";

// PNG imports for the icons
import humidity from "./images/humidity.png";
import windIcon from "./images/wind-signal.png";
import clouds from "./images/clouds.png";

/**
 *
 *  Weather Data Presentational Component:
 *
 * This is basically a presentational component, that aims
 * to display the results of the data that is being
 * fetched in the CityWeather component. We have therefore
 * separated the presentational part of the app from the
 * business logic part of it
 *
 * We use React Boostrap for the presentational bit and pass
 * the data received through props into this component
 * inside the elements that will be rendered in the DOM
 * as innerHTML of the rendered elements
 */

export default function WeatherData({ weatherData }) {
  // we then destructure the top level properties
  // from the weatherData object

  // we include an early return statement so that
  // it fails gracefully when no props are sent
  // we cannot possible provide the default value
  // of the props, hence this is the best alternative
  if (!weatherData) return <p>There is no data!</p>;

  const { main, weather, wind, name, sys } = weatherData;

  return (
    <div className="weather-data-wrapper">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />

      {weather ? (
        <Card style={{ width: "18rem" }} className="container py-5 h-100">
          <Card.Body>
            <Card.Title>{main.temp} °C</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {name} ({sys.country})
            </Card.Subtitle>
            <Card.Text>Feels like: {main.feels_like} °C</Card.Text>
            <Card.Text>
              Max: {main.temp_max}°C ● Min: {main.temp_min}°C
            </Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <img src={humidity} alt="humidity" /> {main.humidity}%
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <img src={windIcon} alt="wind" /> {wind.speed} meter/sec
              </ListGroup.Item>
              <ListGroup.Item>
                <img src={clouds} alt="clouds" /> {weather[0].description}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        "Search your city to display the current weather information!"
      )}
    </div>
  );
}
