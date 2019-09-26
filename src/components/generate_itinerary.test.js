import React from "react";
import {
  render,
  fireEvent,
  getByPlaceholderText
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GenerateItinerary from "./generate_itinerary";

describe("Generate Itinerary", () => {
  it("should be able to generate number of days", () => {
    const { getAllByTestId, getByTestId } = render(<GenerateItinerary />);
    const submitDates = getByTestId("submitDateButton");
    fireEvent.click(submitDates);
    expect(getAllByTestId("add_button_for_each_date")).toHaveLength(8);
  });

  it("should be able to add 1 location input component", () => {
    const { getByTestId, getByPlaceholderText, getAllByTestId } = render(
      <GenerateItinerary />
    );
    const submitDates = getByTestId("submitDateButton");
    fireEvent.click(submitDates);
    const addAllLocation = getAllByTestId("add_button_for_each_date");
    const getFirstButton = addAllLocation[0];
    fireEvent.click(getFirstButton);
    expect(getByPlaceholderText("Location")).toBeInTheDocument();
  });
});
