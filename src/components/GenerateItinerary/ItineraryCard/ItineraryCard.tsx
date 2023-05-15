import React from "react";
import { ItineraryItem } from "../../types";

type ColourProgramProps = {
  [key: string]: string;
};

const colourProgram: ColourProgramProps = {
  accommodation: "#e8b665",
  attraction: "#edcabd",
  transportation: "#f7b19b",
  other: "#a6b1b5",
};

type ItineraryCardContainerProps = {
  travelDetail: ItineraryItem;
  editItem: () => void;
  deleteItem: () => void;
};

const ItineraryCardContainer: React.FC<ItineraryCardContainerProps> = ({
  travelDetail,
  editItem,
  deleteItem,
}) => {
  const editAndDeleteButtons = () => {
    return (
      <div>
        <button id="editButton" data-testid={"edit_item"} onClick={editItem}>
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

  return (
    <div>
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
        <h4>{`$${travelDetail.cost}`}</h4>;{/* {printCostIfMoreThanZero()} */}
        {editAndDeleteButtons()}
      </section>{" "}
    </div>
  );
};

export default ItineraryCardContainer;
