import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GenerateItinerary from "./generate_itinerary";

describe("Generate Itinerary", () => {
  it("should create same number of buttons as per dates", () => {
    const { getByTestId } = render(<GenerateItinerary />);
    expect(getByTestId("")).toBeInTheDocument();
  });
});
