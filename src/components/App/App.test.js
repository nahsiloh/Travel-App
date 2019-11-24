import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("renders without crashing", () => {
    const { getByText } = render(<App />);
    expect(getByText("Lets fly away!")).toBeInTheDocument();
  });

  it("renders Login page on load", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("loginForm")).toBeInTheDocument();
  });

  it("renders Dashboard if logged in", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementationOnce(() => true);
    const { getByTestId } = render(<App />);
    expect(getByTestId("Navbar")).toBeInTheDocument();
  });
});
