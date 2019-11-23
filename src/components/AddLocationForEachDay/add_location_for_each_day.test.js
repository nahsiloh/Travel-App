import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddLocationForEachDay from "../add_location_for_each_day";

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

  it("should be able to delete input", () => {
    const { getByTestId, getAllByTestId } = render(<AddLocationForEachDay />);

    const addAllLocation = getAllByTestId("add_button_for_each_date");
    const getFirstButton = addAllLocation[0];
    fireEvent.click(getFirstButton);

    const deleteItemButton = getByTestId("delete_item");
    fireEvent.click(deleteItemButton);
    expect(deleteItemButton).not.toBeInTheDocument();
  });

  // it("should not on save display cost of $0 ", () => {
  //   const { getAllByTestId, getByLabelText, getByTestId, getByText } = render(
  //     <AddLocationForEachDay />
  //   );

  //   const addAllLocation = getAllByTestId("add_button_for_each_date");
  //   const getFirstButton = addAllLocation[0];
  //   fireEvent.click(getFirstButton);

  //   const getSaveInputButton = getByTestId("save_item");
  //   const getInputLocation = getByLabelText("location_input_box");

  //   fireEvent.change(getInputLocation, { target: { value: "Disneyland" } });
  //   // expect(getByDisplayValue("Disneyland")).toBeInTheDocument();

  //   fireEvent.click(getSaveInputButton);
  //   const updateLocation = jest.fn();

  //   expect(updateLocation).toBeCalledWith("Disneyland", "accommodation", "");

  //   // const getCostDisplay = getByTestId("cost_display");
  //   expect(getByText("$0")).not.toBeInTheDocument();
  // });
});
