import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddInputLocationBox from "./add_input_component";

describe("Add Location for Each Day", () => {
  const updateLocation = jest.fn();
  const deleteItem = jest.fn();
  let travelDetail;

  beforeEach(() => {
    travelDetail = {
      id: 1,
      value: "",
      category: "accomdation",
      cost: ""
    };
  });

  const renderAddInputLocationBox = (details = travelDetail) => {
    return render(
      <AddInputLocationBox
        travelDetail={details}
        updateLocation={updateLocation}
        deleteItem={deleteItem}
      />
    );
  };

  it("should show input options", () => {
    const {
      queryByPlaceholderText,
      getByText,
      getByTestId
    } = renderAddInputLocationBox();

    const getCategory = getByText("Accommodation");
    const getInputLocation = queryByPlaceholderText("Location");
    const getCost = queryByPlaceholderText("Cost");
    const saveItemButton = getByTestId("save_item");
    const deleteItemButton = getByTestId("delete_item");
    expect(getInputLocation).toBeInTheDocument();
    expect(getCost).toBeInTheDocument();
    expect(getCategory).toBeInTheDocument();
    expect(saveItemButton).toBeInTheDocument();
    expect(deleteItemButton).toBeInTheDocument();
  });

  it("should be able to save 1 location", () => {
    const {
      queryByPlaceholderText,
      getByTestId,
      getByDisplayValue
    } = renderAddInputLocationBox();

    const getInputLocation = queryByPlaceholderText("Location");
    const getSaveInputButton = getByTestId("save_item");
    fireEvent.change(getInputLocation, { target: { value: "Disneyland" } });
    expect(getByDisplayValue("Disneyland")).toBeInTheDocument();
    fireEvent.click(getSaveInputButton);
    expect(updateLocation).toBeCalledWith("Disneyland", "accommodation", "");
    expect(getInputLocation).not.toBeInTheDocument();
  });

  // delete
  it("should be able to delete input", () => {
    const { getByTestId } = renderAddInputLocationBox();
    const deleteItemButton = getByTestId("delete_item");
    fireEvent.click(deleteItemButton);
    expect(deleteItem).toHaveBeenCalledTimes(1);
  });

  // edit
  it("should on save be able to see the edit button and edit item", () => {
    const {
      queryByPlaceholderText,
      getByTestId,
      getByDisplayValue
    } = renderAddInputLocationBox();

    const getInputLocation = queryByPlaceholderText("Location");
    const getSaveInputButton = getByTestId("save_item");

    fireEvent.change(getInputLocation, { target: { value: "Disneyland" } });
    expect(getByDisplayValue("Disneyland")).toBeInTheDocument();
    fireEvent.click(getSaveInputButton);
    expect(updateLocation).toBeCalledWith("Disneyland", "accommodation", "");

    const getEditButton = getByTestId("edit_item");
    expect(getEditButton).toBeInTheDocument();
    fireEvent.click(getEditButton);
    expect(getByDisplayValue("Disneyland")).toBeInTheDocument();
  });

  // on save you should not se accodomodation, location, cost, save and delete but can see edit and delete
  it("should on save not be able to see inputs for accommodation, location and cost but able to see the delete button", () => {
    const {
      getByTestId,
      queryByPlaceholderText,
      getByDisplayValue,
      getByText
    } = renderAddInputLocationBox();
    const getInputLocation = queryByPlaceholderText("Location");
    const getSaveInputButton = getByTestId("save_item");
    const getCategory = getByText("Accommodation");
    const getCost = queryByPlaceholderText("Cost");

    fireEvent.change(getInputLocation, { target: { value: "Disneyland" } });
    expect(getByDisplayValue("Disneyland")).toBeInTheDocument();
    fireEvent.click(getSaveInputButton);
    expect(updateLocation).toBeCalledWith("Disneyland", "accommodation", "");

    const getDeleteButton = getByTestId("delete_item");
    expect(getDeleteButton).toBeInTheDocument();
    expect(getInputLocation).not.toBeInTheDocument();
    expect(getCost).not.toBeInTheDocument();
    expect(getCategory).not.toBeInTheDocument();
  });

  // it("should be able to save the Cost input", () => {
  //   const { queryByPlaceholderText, getByTestId } = renderAddInputLocationBox();
  //   const getCost = queryByPlaceholderText("Cost");
  //   const getSaveInputButton = getByTestId("save_item");

  //   fireEvent.change(getCost, { target: { cost: "100" } });
  //   fireEvent.click(getSaveInputButton);
  //   expect(updateLocation).toBeCalledWith("", "accommodation", "100");

  //   const a = new updateLocation();
  //   const b = {};
  //   const bound = updateLocation.bind(b);
  //   bound();
  //   console.log(updateLocation.mock.instances);
  // });
});
