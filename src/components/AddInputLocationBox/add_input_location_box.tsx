import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { ItineraryItem } from "../types";

import "./add_input_location_box.css";

type ColourProgramProps = {
  [key: string]: string;
};

const colourProgram: ColourProgramProps = {
  accommodation: "#e8b665",
  attraction: "#edcabd",
  transportation: "#f7b19b",
  other: "#a6b1b5",
};

type AddInputLocationBoxProps = {
  key: string;
  travelDetail: ItineraryItem;
  saveLocation: (dest: string, prog: string, cost: number) => void;
  deleteItem: () => void;
};

const AddInputLocationBox: React.FC<
  AddInputLocationBoxProps & RouteComponentProps
> = ({ key, travelDetail, saveLocation, deleteItem }) => {
  const [shouldShowInputBoxForEdit, setShouldShowInputBoxForEdit] =
    useState(false);
  const [destination, setDestination] = useState("");
  const [program, setProgram] = useState("accommodation");
  const [cost, setCost] = useState(0);

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDestination(event.target.value);
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCost(Number(event.target.value));
  };

  const handleProgramChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProgram(event.target.value);
  };

  const saveItem = () => {
    if (destination.length === 0) {
      return;
    }
    setShouldShowInputBoxForEdit(false);
    saveLocation(destination, program, cost);
  };

  const createInputBox = () => {
    return (
      <div className={"input_box_container"} data-testid="input_box">
        <select
          id="selectProgram"
          value={program || travelDetail.program}
          onChange={handleProgramChange}
        >
          <option value="accommodation">Accommodation</option>
          <option value="attraction">Attractions</option>
          <option value="transportation">Transportation</option>
          <option value="other">Other</option>
        </select>
        <textarea
          aria-label="location_input_box"
          onChange={handleDestinationChange}
          value={destination || travelDetail.destination}
          placeholder={"Location"}
        />
        <input
          id="inputCost"
          type="number"
          aria-label="cost_input_box"
          min="0"
          onChange={handleCostChange}
          value={cost || travelDetail.cost}
          placeholder={"Cost"}
        />
        <button id="saveButton" data-testid={"save_item"} onClick={saveItem}>
          <i className="fas fa-check"></i>
        </button>
        <button
          id="deleteButton"
          data-testid={"delete_item"}
          onClick={deleteItem}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    );
  };

  const editAndDeleteButtons = () => {
    return (
      <div>
        <button id="saveButton" data-testid={"edit_item"} onClick={editItem}>
          <i className="fas fa-pen"></i>
        </button>
        <button
          id="deleteButton"
          data-testid={"delete_item"}
          onClick={deleteItem}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    );
  };

  const printCostIfMoreThanZero = () => {
    if (Number(travelDetail.cost) <= 0) {
      return;
    }
    return <h4>{`$${travelDetail.cost}`}</h4>;
  };

  const displayExistingTravelDetail = () => {
    return (
      <div data-testid="saved_input">
        <h4
          className="travelDetail__heading"
          style={{
            backgroundColor: colourProgram[travelDetail.program || ""],
          }}
        >
          {travelDetail.program}
        </h4>
        <section className="travelDetail__form">
          <h4>{travelDetail.destination}</h4>
          {printCostIfMoreThanZero()}
          {editAndDeleteButtons()}
        </section>
      </div>
    );
  };

  const displayTravelDetailOrInputBox = () => {
    if (travelDetail.destination) {
      if (travelDetail?.destination.length > 0 && !shouldShowInputBoxForEdit) {
        return displayExistingTravelDetail();
      } else if (
        travelDetail?.destination.length === 0 ||
        shouldShowInputBoxForEdit
      ) {
        return createInputBox();
      }
    }
  };

  const editItem = () => {
    setDestination(travelDetail?.destination || "");
    setProgram(travelDetail?.program || "");
    setCost(travelDetail?.cost || 0);
    setShouldShowInputBoxForEdit(true);
  };

  return (
    <div className={"input_display_container"}>
      {displayTravelDetailOrInputBox()}
    </div>
  );
};

export default withRouter(AddInputLocationBox);
