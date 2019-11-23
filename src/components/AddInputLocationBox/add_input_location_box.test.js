import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddInputLocationBox from "../components/add_input_location_box";

describe("Add Location for Each Day", () => {
  const updateLocation = jest.fn();
  const deleteItem = jest.fn();
  let travelDetail;

  beforeEach(() => {
    updateLocation.mockRestore();
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

  it("should be able to input the Cost item", () => {
    const { getByLabelText, getByDisplayValue } = renderAddInputLocationBox();
    const getCost = getByLabelText("cost_input_box");

    fireEvent.change(getCost, { target: { value: "100" } });
    expect(getByDisplayValue("100")).toBeInTheDocument();
  });

  it("should be able to delete input", () => {
    const { getByTestId } = renderAddInputLocationBox();
    const deleteItemButton = getByTestId("delete_item");
    fireEvent.click(deleteItemButton);
    expect(deleteItem).toHaveBeenCalledTimes(1);
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

  describe("after saving", () => {
    it("should be able to see the edit button and edit item", () => {
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

    it("should be able to see inputs for accommodation, location and cost but able to see the delete button", () => {
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
  });

  // it("should not on save display cost of $0 ", () => {
  //   const {
  //     getByLabelText,
  //     getByTestId,
  //     getByText
  //   } = renderAddInputLocationBox();
  //   // const getCost = getByLabelText("cost_input_box");
  //   const getSaveInputButton = getByTestId("save_item");
  //   const getInputLocation = getByLabelText("location_input_box");

  //   fireEvent.change(getInputLocation, { target: { value: "Disneyland" } });
  //   // expect(getByDisplayValue("Disneyland")).toBeInTheDocument();

  //   fireEvent.click(getSaveInputButton);
  //   expect(updateLocation).toBeCalledWith("Disneyland", "accommodation", "");

  //   // const getCostDisplay = getByTestId("cost_display");
  //   expect(getByText("$0")).not.toBeInTheDocument();
  // });
});
