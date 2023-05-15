import React, { useContext, useState } from "react";

import { ItineraryItem } from "../../types";
import { ReducerContext } from "../../App";
import { editTrip } from "../../../api/api";
import { setFetchTrip } from "../../../reducer/actions";

import "../add_input_location_box.css";
import ItineraryCardContainer from "./ItineraryCard";
import InputCard from "../InputCard";
import { deleteItemFromList } from "../utils";

type ItineraryCardProps = {
  travelDetail: ItineraryItem;
  checkInputCardFunc: (isShowInputCard: boolean) => void;
};

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  travelDetail,
  checkInputCardFunc,
}) => {
  const { state, dispatch } = useContext(ReducerContext);
  const { tripId, tripItineraryList } = state;

  const [isItineraryEdit, setIsItineraryEdit] = useState(false);

  const editItem = () => {
    console.log("enters here");
    setIsItineraryEdit(true);
  };

  const deleteItem = async () => {
    const editedTrip = deleteItemFromList(
      tripItineraryList,
      travelDetail._id || ""
    );

    try {
      await editTrip(tripId, editedTrip);
      dispatch(setFetchTrip(true));
    } catch (error) {}
    checkInputCardFunc(false);
  };

  return (
    <div data-testid="saved_input">
      {!isItineraryEdit ? (
        <ItineraryCardContainer
          travelDetail={travelDetail}
          editItem={editItem}
          deleteItem={deleteItem}
        />
      ) : (
        <InputCard
          travelDetail={travelDetail}
          checkInputCardFunc={function (isShowInputCard: boolean): void {
            throw new Error("Function not implemented.");
          }}
          isExistingItem={true}
        />
      )}
    </div>
  );
};

export default ItineraryCard;
