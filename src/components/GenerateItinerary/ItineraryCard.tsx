import React from "react";

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

type ItineraryCardProps = {
  travelDetail: ItineraryItem;
  checkInputCardFunc: (isShowInputCard: boolean) => void;
};

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  travelDetail,
  checkInputCardFunc,
}) => {
  const editItem = () => {
    checkInputCardFunc(true);
  };

  const deleteItem = () => {};

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

export default ItineraryCard;
