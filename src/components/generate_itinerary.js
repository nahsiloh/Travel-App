import React from "react";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import "./generate_itinerary.css";

import { formatDate } from "./format_dates";
import AddLocation from "./add_location";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

class GenerateItinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment().add(7, "days"),
      date_difference: "",
      travel_dates: []
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
        <div key={day}>
          <p>{formatDate(day)}</p>
          <AddLocation />
        </div>
      );
    });
  };

  generateItinerary = () => {
    const displayDays = this.countDays();
    const travel_dates = this.printDatesList();

    this.setState(() => {
      return {
        date_difference: displayDays,
        travel_dates
      };
    });
  };

  render() {
    return (
      <div className={"setDate_container"}>
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
        <button className={"submit_button"} onClick={this.generateItinerary}>
          Lets fly!
        </button>
        <div>{this.state.travel_dates}</div>
      </div>
    );
  }
}

export default GenerateItinerary;
