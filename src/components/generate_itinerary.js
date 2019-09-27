import React from "react";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import "./generate_itinerary.css";

import { formatDate, formatDay } from "./format_dates";
import AddLocationForEachDay from "./add_location";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

class GenerateItinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment().add(7, "days"),
      dateDifference: "",
      travelDates: []
    };
  }

  countDays = () => {
    const diffDay = this.state.endDate.diff(this.state.startDate, "days");
    return diffDay + 1;
  };

  printDatesList = () => {
    const dateRange = moment.range(this.state.startDate, this.state.endDate);
    const listDates = Array.from(dateRange.by("days"));
    return listDates.map(day => {
      return (
        <div key={day} className={"print_date"}>
          <div className={"dates"}>
            <p className={"display_dates"}>{formatDate(day)}</p>
            <p className={"display_dates"}>{formatDay(day)}</p>
          </div>
          <AddLocationForEachDay />
        </div>
      );
    });
  };

  generateItinerary = () => {
    const displayDays = this.countDays();
    const travelDates = this.printDatesList();

    this.setState(() => {
      return {
        dateDifference: displayDays,
        travelDates
      };
    });
  };

  render() {
    return (
      <div data-testid={"Travel_Itinerary"} className={"itinerary_container"}>
        <div className={"set_date_container"}>
          <DateRangePicker
            startDate={this.state.startDate}
            startDateId="departure_date"
            endDate={this.state.endDate}
            endDateId="return_date"
            onDatesChange={({ startDate, endDate }) =>
              this.setState({ startDate, endDate })
            }
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
        </div>
        <button
          data-testid={"submitDateButton"}
          className={"submit_date_button"}
          onClick={this.generateItinerary}
        >
          <i className="far fa-paper-plane"></i>
        </button>
        <div className={"travel_dates"}>{this.state.travelDates}</div>
      </div>
    );
  }
}

export default GenerateItinerary;
