import React from "react";
import "./CitySelector.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

/**
 *
 * The CitySelector is basically as presentational component
 * similar to the WeatherData component. Where as the WeatherData
 * component handles the presentation of the data returned by
 * the API call, this component handles the presentation
 * of the input control and Search button. The props are passed
 * in from the parent component to pass in the data and trigger
 * some state changes
 */
export default function CitySelector({
  setCitySelection,
  citySelection,
  setLoading,
  setSearchCity,
}) {
  return (
    <div className="city-selector-wrapper">
      <InputGroup className="mb-2">
        <FormControl
          placeholder="Search your city..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => {
            setCitySelection(e.target.value);
          }}
          id="cityselector"
          name="cityselector"
          value={citySelection}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => {
            setLoading(true);
            setSearchCity(citySelection);
          }}
        >
          Search
        </Button>
      </InputGroup>
    </div>
  );
}
