import React from "react";
import { render, fireEvent, wait, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TripSelector from "./trip_selector";
import * as data from "../../api/api";

const mockPost = jest.spyOn(data, "fetchTrips");

const tripsData = [
  {
    _id: "5dd2a6a2fcaa4d06281084ec",
    name: "Europe escapades",
    startDate: "2019-11-18T14:11:18.000Z",
    endDate: "2019-11-25T14:11:18.000Z",
    itinerary: []
  },
  {
    _id: "5dd2a6c8fcaa4d06281084ee",
    name: "SEA travels",
    startDate: "2019-11-18T14:12:18.000Z",
    endDate: "2019-11-25T14:12:18.000Z",
    itinerary: []
  }
];

describe("Trip Selector", () => {
  it("should display a list of trip names to select", () => {
    const { getByTestId } = render(<TripSelector />);

    const getTripSelector = getByTestId("trip_selector");
  });
});
