import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";

import { ItineraryItem } from "../types";

import "./add_input_location_box.css";
import { editTrip } from "../../api/api";
import { ReducerContext } from "../App";
import { setFetchTrip } from "../../reducer/actions";

const PROGRAMME_TYPES = [
  "accommodation",
  "attraction",
  "transportation",
  "other",
];

type InputCardProps = {
  travelDetail: ItineraryItem;
  // saveItem: (dest: string, prog: string, cost: number) => void;
  checkInputCardFunc: (isShowInputCard: boolean) => void;
};

const InputCard: React.FC<InputCardProps> = ({
  travelDetail,
  checkInputCardFunc,
}) => {
  const { state, dispatch } = useContext(ReducerContext);
  const { tripId, tripItineraryList } = state;

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

  const saveItem = async () => {
    try {
      const editedTrip = [
        ...tripItineraryList,
        {
          destination,
          program,
          cost,
          date: travelDetail.date,
        },
      ];
      await editTrip(tripId, editedTrip);
      dispatch(setFetchTrip(true));
    } catch (error) {
      console.log(error);
    }
    checkInputCardFunc(false);
  };

  const deleteItem = () => {
    checkInputCardFunc(false);
  };

  return (
    <div className={"input_box_container"} data-testid="input_box">
      <select id="selectProgram" value={program} onChange={handleProgramChange}>
        {PROGRAMME_TYPES.map((type) => {
          return <option value={type}>{type}</option>;
        })}
      </select>
      <textarea
        aria-label="location_input_box"
        onChange={handleDestinationChange}
        value={destination}
        placeholder={"Location"}
      />
      <input
        id="inputCost"
        type="number"
        aria-label="cost_input_box"
        min="0"
        onChange={handleCostChange}
        value={cost}
        placeholder={"Cost"}
      />
      <Button
        id="saveButton"
        size="lg"
        style={{
          backgroundColor: "#5f9595",
        }}
        onClick={saveItem}
      >
        <i className="fas fa-check"></i>
      </Button>

      <Button
        id="deleteButton"
        size="lg"
        style={{
          backgroundColor: "#5f9595",
        }}
        onClick={deleteItem}
      >
        <i className="far fa-trash-alt"></i>
      </Button>
    </div>
  );
};

export default InputCard;
