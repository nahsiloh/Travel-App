import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ExistingTrip from "./existing_trip";
import * as data from "../../api/api";

const mockPost = jest.spyOn(data, "fetchTripById");

const trip = [
  {
    user: "5dd0d7d15e81984494aab1f0",
    name: "90 days around the world",
    startDate: "2019-10-16T00:00:00.000Z",
    endDate: "2019-10-25T00:00:00.000Z",
    itinerary: [
      {
        cost: 0,
        destination: "London",
        program: "accommodation",
        date: "2019-10-18T00:00:00.000Z"
      },
      {
        cost: 0,
        destination: "Paris",
        program: "accommodation",
        date: "2019-10-19T00:00:00.000Z"
      },
      {
        cost: 0,
        destination: "Rome",
        program: "accommodation",
        date: "2019-10-20T00:00:00.000Z"
      }
    ]
  }
];
//require to fetchdata
// press the generate button
// check if the item is listed
describe("Get Existing Trip", () => {
  it("should display existing trip", () => {
    const {} = render(<ExistingTrip />);
  });
});
