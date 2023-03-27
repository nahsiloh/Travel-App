import React, { useEffect, useState, useRef } from "react";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { add, format, eachDayOfInterval, isBefore } from "date-fns";
import { Datepicker } from "@datepicker-react/styled";
import { Button, InputGroup, Overlay } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { createNewTrip } from "../../api/api";
import { formatDate } from "../utils";
import AddLocationForEachDay from "../AddLocationForEachDay/add_location_for_each_day";
import { ItineraryItem } from "../types";

import "./CreateTrip.css";

type CreateTripProps = {
  checkIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
  tripId: string;
};

const CreateTrip: React.FC<CreateTripProps & RouteComponentProps> = () => {
  const history = useHistory();
  const target = useRef(null);

  const [tripName, setTripName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(add(startDate, { days: 7 }));
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >("startDate");
  const [travelDates, setTravelDates] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tripDisplay, setTripDisplay] = useState({});
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGenerateItinerary, setIsGenerateItinerary] = useState(false);

  useEffect(() => {
    if (selectedDate !== null) {
      if (isBefore(selectedDate, endDate) === true) {
        setFocusedInput("startDate");
        setStartDate(selectedDate);
      } else {
        setFocusedInput("endDate");
        setEndDate(selectedDate);
      }
    }
  }, [selectedDate, endDate]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTripName(event.target.value);
  };

  const handleDatePickerOpen = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleDatePickerClose = () => {
    setIsDatePickerOpen(false);
  };

  const onDatesChange = (startDate: Date | null, endDate: Date | null) => {
    console.log("startDate::", startDate);
    console.log("endDate::", endDate);
    console.log("selectedDate::", selectedDate);
  };

  const saveNewTrip = async () => {
    const tripString = localStorage.getItem("trip");
    const trip = tripString ? JSON.parse(tripString) : {};
    const itineraries: ItineraryItem[] = [];

    if (Object.keys(trip).length > 0) {
      const dates = Object.keys(trip);
      dates.forEach((date) => {
        const travelDetails = trip[date];
        travelDetails.forEach((item: ItineraryItem) => {
          itineraries.push(item);
        });
      });

      // eslint-disable-next-line array-callback-return
      itineraries.map((travelDetail) => {
        if (travelDetail.date) {
          const d = new Date(travelDetail.date);
          return format(d, "YYYY-MM-DD");
        }
      });
    }

    const newTrip = {
      name: tripName,
      startDate: String(startDate),
      endDate: String(endDate),
      itinerary: itineraries,
    };

    await createNewTrip(newTrip);
    localStorage.removeItem("trip");

    setTripName("");
    setStartDate(new Date());
    setEndDate(add(startDate, { days: 7 }));
    setTravelDates([]);
    setTripDisplay({});

    history.push("/tripSelect");
  };

  const printDatesList = () => {
    console.log("startDate::");
    const listDates = eachDayOfInterval({ start: startDate, end: endDate });
    console.log("listDates::", listDates);

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

  const generateItinerary = () => {
    localStorage.removeItem("trip");

    setTripDisplay(travelDates);
    setIsGenerateItinerary(true);
  };

  return (
    <Container>
      <div data-testid={"Travel_Itinerary"} className={"itinerary_container"}>
        <h2 className="createItinerary__heading">Plan a new trip!</h2>
        <section className="createItinerary__form">
          <h3>Trip Name</h3>
          <InputGroup className="mb-4" size="lg">
            <Form.Control
              placeholder="Name Your Trip!"
              type="string"
              onChange={handleNameChange}
            />
          </InputGroup>

          <h3>Trip Duration</h3>
          <Row className="mb-4" style={{ padding: 0 }}>
            <Col>
              <h4>Start Date</h4>
              <Button
                ref={target}
                size="lg"
                style={{
                  margin: 0,
                  backgroundColor: "#5f9595",
                  width: 120,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
                onClick={handleDatePickerOpen}
              >
                {formatDate(startDate)}
              </Button>
            </Col>
            <Col>
              <h4>End Date</h4>
              <Button
                ref={target}
                size="lg"
                style={{
                  margin: 0,
                  backgroundColor: "#5f9595",
                  width: 120,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
                onClick={handleDatePickerOpen}
              >
                {formatDate(endDate)}
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
                  startDate={startDate}
                  endDate={endDate}
                  onClose={handleDatePickerClose}
                  onDatesChange={({ startDate, endDate }) => {
                    setSelectedDate(startDate);
                    onDatesChange(startDate, endDate);
                  }}
                  focusedInput={focusedInput}
                  numberOfMonths={2}
                  showSelectedDates={false}
                  showResetDates={false}
                />
              </div>
            )}
          </Overlay>

          <Button
            ref={target}
            size="lg"
            style={{
              backgroundColor: "#5f9595",
            }}
            onClick={generateItinerary}
          >
            <i className="far fa-paper-plane"></i>
          </Button>

          <Button
            size="lg"
            style={{
              backgroundColor: "#5f9595",
            }}
            onClick={saveNewTrip}
          >
            Save Trip
          </Button>

          {isGenerateItinerary ? printDatesList() : <></>}
        </section>
      </div>
    </Container>
  );
};

export default withRouter(CreateTrip);
