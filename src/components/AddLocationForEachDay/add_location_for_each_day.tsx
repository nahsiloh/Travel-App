import React, { useState } from "react";

import AddInputLocationBox from "../AddInputLocationBox/add_input_location_box";
import { v4 as uuidv4 } from "uuid";
import "./add_location_for_each_day.css";

import { ItineraryItem } from "../types";

type AddLocationForEachDayProps = {
  dateToSave: Date;
  itineraryPerDay: ItineraryItem[];
  dateToDisplay: string;
};

const AddLocationForEachDay: React.FC<AddLocationForEachDayProps> = ({
  dateToSave,
  itineraryPerDay,
  dateToDisplay,
}) => {
  const [itineraryList, setItineraryList] = useState(itineraryPerDay);

  const displayOneItineraryInput = () => {
    setItineraryList([
      ...itineraryPerDay,
      {
        id: uuidv4(),
        destination: "",
        program: "",
        cost: 0,
        date: String(dateToSave),
      },
    ]);
  };

  const saveLocation = (
    travelDetail: ItineraryItem,
    inputDestination: string,
    inputProgram: string,
    inputCost: number
  ) => {
    travelDetail.destination = inputDestination;
    travelDetail.program = inputProgram;
    travelDetail.cost = inputCost;

    setItineraryList(itineraryList);

    const tripString = localStorage.getItem("trip");
    const trip = tripString ? JSON.parse(tripString) : {};
    trip[dateToDisplay] = itineraryList;
    localStorage.setItem("trip", JSON.stringify(trip));
  };

  const deleteLocation = (travelDetail: ItineraryItem) => {
    const updatedTripAfterDelete = itineraryList.filter(
      (item) => item !== travelDetail
    );
    setItineraryList([...updatedTripAfterDelete]);

    const tripString = localStorage.getItem("trip");
    const trip = tripString ? JSON.parse(tripString) : {};
    trip[dateToDisplay] = updatedTripAfterDelete;
    localStorage.setItem("trip", JSON.stringify(trip));
  };

  return (
    <div>
      <div className={"each_date"}>
        <button
          id={"add_button_for_each_date"}
          data-testid={"add_button_for_each_date"}
          onClick={displayOneItineraryInput}
        >
          <i className="fas fa-plus"></i>
        </button>

        <div className={"list_of_locations"}>
          {itineraryList.map((travelDetail) => {
            return (
              <AddInputLocationBox
                key={travelDetail.id}
                travelDetail={travelDetail}
                saveLocation={(dest: string, prog: string, cost: number) =>
                  saveLocation(travelDetail, dest, prog, cost)
                }
                deleteItem={() => deleteLocation(travelDetail)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddLocationForEachDay;
