import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { eachDayOfInterval } from "date-fns";

import DayColumn from "./DayColumn";
import { formatDate } from "../utils";

import { ReducerContext } from "../App";

type GenerateItineraryProps = {};

// eslint-disable-next-line no-empty-pattern
const GenerateItinerary: React.FC<GenerateItineraryProps> = ({}) => {
  const { state } = useContext(ReducerContext);
  const { tripStartDate, tripEndDate, tripItineraryByDate } = state;

  console.log("tripItineraryByDate::", tripItineraryByDate);

  const [dateList, setDateList] = useState<Date[]>([]);

  useEffect(() => {
    const dateList = eachDayOfInterval({
      start: tripStartDate,
      end: tripEndDate,
    });

    console.log(dateList);
    setDateList(dateList);
  }, [tripStartDate, tripEndDate]);

  return (
    <div>
      <Row
        style={{
          display: "block",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {dateList.map((date) => {
          const formattedDate = formatDate(date);
          return (
            <Col size="xs" style={{ display: "inline-block", width: "25%" }}>
              <DayColumn
                date={formattedDate}
                itinerary={tripItineraryByDate[formattedDate] || []}
              />
              ;
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default GenerateItinerary;
