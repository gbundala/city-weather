import React from "react";
import renderer from "react-test-renderer";
import CitySelector from "./CitySelector";

// Snapshot testing

// testing whether the CitySelector presentational component
// renders correctly and matches the saved snapshot

test("renders correctly", () => {
  const tree = renderer.create(<CitySelector />).toJSON();

  expect(tree).toMatchSnapshot();
});
