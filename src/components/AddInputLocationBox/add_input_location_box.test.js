import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddInputLocationBox from "./add_input_location_box";

describe("Add Location for Each Day", () => {
  let travelDetail;

  beforeEach(() => {
    travelDetail = {
      id: 1,
      destination: "",
      program: "accommodation",
      cost: "",
      date: ""
    };
  });

  const saveLocation = jest.fn();
  const deleteItem = jest.fn();

  saveLocation.mockRestore();

  describe("Input box", () => {
    it("should show input options", () => {
      const { queryByPlaceholderText, getByText, getByTestId } = render(
        <AddInputLocationBox travelDetail={travelDetail} />
      );

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
      const { getByLabelText, getByDisplayValue } = render(
        <AddInputLocationBox travelDetail={travelDetail} />
      );
      const getCost = getByLabelText("cost_input_box");

      fireEvent.change(getCost, { target: { value: "100" } });
      expect(getByDisplayValue("100")).toBeInTheDocument();
    });

    it("should be able to delete input", () => {
      const { getByTestId } = render(
        <AddInputLocationBox
          travelDetail={travelDetail}
          deleteItem={deleteItem}
        />
      );
      const deleteItemButton = getByTestId("delete_item");
      fireEvent.click(deleteItemButton);
      expect(deleteItem).toHaveBeenCalledTimes(1);
    });

    it("should clear input box after clicking save", async () => {
      const { queryByPlaceholderText, getByTestId, getByDisplayValue } = render(
        <AddInputLocationBox
          travelDetail={travelDetail}
          deleteItem={deleteItem}
          saveLocation={saveLocation}
        />
      );

      const getInputLocation = queryByPlaceholderText("Location");
      const getSaveInputButton = getByTestId("save_item");
      const getInputBox = getByTestId("input_box");

      fireEvent.change(getInputLocation, { target: { value: "Disneyland" } });
      expect(getByDisplayValue("Disneyland")).toBeInTheDocument();
      fireEvent.click(getSaveInputButton);
      expect(saveLocation).toBeCalledWith("Disneyland", "accommodation", 0);

      expect(getInputBox).not.toBeInTheDocument;
    });
  });

  describe("after saving", () => {
    it("should be able to see the saved input, edit button and delete button", async () => {
      const travelDetail = {
        id: 1,
        destination: "Disneyland",
        program: "accommodation",
        cost: "",
        date: ""
      };

      const { getByTestId } = render(
        <AddInputLocationBox
          travelDetail={travelDetail}
          saveLocation={saveLocation}
        />
      );

      const getSavedInput = getByTestId("saved_input");
      const getEditButton = getByTestId("edit_item");
      const getDeleteButton = getByTestId("delete_item");
      expect(getSavedInput).toBeInTheDocument;
      expect(getEditButton).toBeInTheDocument;
      expect(getDeleteButton).toBeInTheDocument;
    });
  });

  it("should display the cost of the trip", () => {
    const travelDetail = {
      id: 1,
      destination: "Disneyland",
      program: "accommodation",
      cost: "$100",
      date: ""
    };

    const { getByTestId } = render(
      <AddInputLocationBox
        travelDetail={travelDetail}
        saveLocation={saveLocation}
      />
    );

    expect("$100").toBeInTheDocument;
  });
});
