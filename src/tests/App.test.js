import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("Travel Application", () => {
  it("should render my Travel Itinerary", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("Travel_Itinerary")).toBeInTheDocument();
  });
});
