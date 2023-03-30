import React, { useState, useRef, useEffect, useContext } from "react";

import { Datepicker } from "@datepicker-react/styled";
import { isBefore } from "date-fns";
import { Button, Overlay } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { formatDate } from "../utils";
import { ReducerContext } from "../App";

import { ButtonStyles } from "../../UIComponents/styles";
import { updateStartDate, updateEndDate } from "../../reducer/actions";

const DateSelector: React.FC = () => {
  const { state, dispatch } = useContext(ReducerContext);
  const { tripStartDate, tripEndDate } = state;

  console.log("tripStartDate::", tripStartDate);

  const target = useRef(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >("startDate");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    if (selectedDate !== null) {
      if (isBefore(selectedDate, tripEndDate) === true) {
        setFocusedInput("startDate");
        dispatch(updateStartDate(selectedDate));
      } else {
        setFocusedInput("endDate");
        dispatch(updateEndDate(selectedDate));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, tripEndDate, tripStartDate]);

  const handleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleDatePickerClose = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <div>
      <Row className="mb-4" style={{ padding: 0 }}>
        <Col>
          <h4>Start Date</h4>
          <Button
            ref={target}
            size="lg"
            style={{ ...ButtonStyles }}
            onClick={handleDatePicker}
          >
            {formatDate(tripStartDate)}
          </Button>
        </Col>
        <Col>
          <h4>End Date</h4>
          <Button
            ref={target}
            size="lg"
            style={{ ...ButtonStyles }}
            onClick={handleDatePicker}
          >
            {formatDate(tripEndDate)}
          </Button>
        </Col>
      </Row>

      <Overlay
        target={target.current}
        show={isDatePickerOpen}
        placement="bottom"
      >
        {({ ...props }) => (
          <div
            {...props}
            style={{
              position: "absolute",
              marginTop: 10,
              marginLeft: "auto",
              marginRight: "auto",
              ...props.style,
            }}
          >
            <Datepicker
              startDate={tripStartDate}
              endDate={tripEndDate}
              onClose={handleDatePickerClose}
              onDatesChange={({ startDate }) => {
                setSelectedDate(startDate);
              }}
              focusedInput={focusedInput}
              numberOfMonths={2}
              showSelectedDates={false}
              showResetDates={false}
            />
          </div>
        )}
      </Overlay>
    </div>
  );
};

export default DateSelector;
