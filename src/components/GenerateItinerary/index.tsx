import React, { useContext, useEffect, useState } from "react";
import { eachDayOfInterval } from "date-fns";

import AddLocationForEachDay from "../AddLocationForEachDay/add_location_for_each_day";

import { formatDate } from "../utils";

import { ReducerContext } from "../App";

type GenerateItineraryProps = {};

const GenerateItinerary: React.FC<GenerateItineraryProps> = ({}) => {
  const { state } = useContext(ReducerContext);
  const { tripStartDate, tripEndDate } = state;

  const [listDates, setListDates] = useState<Date[]>([]);

  useEffect(() => {
    const listDates = eachDayOfInterval({
      start: tripStartDate,
      end: tripEndDate,
    });
    setListDates(listDates);
  }, [tripStartDate, tripEndDate]);

  return (
    <div>
      {listDates.map((day) => {
        return (
          <div key={String(day)} className={"print_date"}>
            <div className={"dates"}>
              <AddLocationForEachDay
                dateToSave={day}
                itineraryPerDay={[]}
                dateToDisplay={""}
              />
              <p className={"display_dates"}>{formatDate(day)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GenerateItinerary;
