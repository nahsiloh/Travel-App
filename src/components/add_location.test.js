import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddLocationForEachDay from "./add_location";

describe("Add Location for Each Day", () => {
  it("should be able to add 1 location input component", () => {
    const { getByPlaceholderText, getAllByTestId } = render(
      <AddLocationForEachDay />
    );
    const addAllLocation = getAllByTestId("add_button_for_each_date");
    const getFirstButton = addAllLocation[0];
    fireEvent.click(getFirstButton);
    expect(getByPlaceholderText("Location")).toBeInTheDocument();
  });

  //test the delete button
  it("should before save be able to delete input", () => {
    const { getByTestId, getAllByTestId } = render(<AddLocationForEachDay />);

    const addAllLocation = getAllByTestId("add_button_for_each_date");
    const getFirstButton = addAllLocation[0];
    fireEvent.click(getFirstButton);

    const deleteItemButton = getByTestId("delete_item");
    fireEvent.click(deleteItemButton);
    expect(deleteItemButton).not.toBeInTheDocument();
  });
});
