import React from "react";
import axios from "axios";
import uuidv1 from "uuid/v1";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import "../static/date_picker.css";

import { formatDate, formatDay, formatDateFromAPI } from "./format_dates";
import AddLocationForEachDay from "./add_location_for_each_day";
import AddInputLocationBox from "./add_input_location_box";
import SelectCountry from "./select_country";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

const baseUrl = "http://localhost:5000";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment().add(7, "days"),
      travelDates: [],
      tripsData: [],
      tripData: { name: "" },
      tripDisplay: {}
    };
  }

  countDays = () => {
    const diffDay = this.state.endDate.diff(this.state.startDate, "days");
    return diffDay + 1;
  };

  // componentDidMount() {
  //   const url = `${baseUrl}/trips`;
  //   axios.get(url, { withCredentials: true }).then(res => {
  //     this.setState({ tripsData: res.data });
  //   });
  // }

  componentDidMount() {
    const url = `${baseUrl}/trips/5da99a7d26adab73ec7faadf`;
    axios
      .get(url, { withCredentials: true })
      .then(res => {
        const trip = res.data;

        const display = trip.itinerary.reduce((acc, cur) => {
          if (Array.isArray(acc[cur.date])) {
            acc[cur.date].push(cur);
          } else {
            acc[cur.date] = [cur];
          }
          return acc;
        }, {});

        this.setState({ tripDisplay: display, tripData: trip });
      })
      .catch(err => {
        console.log(err);
      });
  }

  saveTrip = () => {
    const trip = JSON.parse(localStorage.getItem("trip")) || {};
    const itineraries = [];
    const dates = Object.keys(trip);
    dates.forEach(date => {
      trip[date].forEach(travelDetail => {
        itineraries.push(travelDetail);
      });
    });

    const url = `${baseUrl}/trips/5da99a7d26adab73ec7faadf`;
    axios.patch(url, { itinerary: itineraries }, { withCredentials: true });

    // get data from local storage
    //convert data to required format
    // send data
  };

  printDatesList = () => {
    let dateRange = {};
    if (Object.entries(this.state.tripDisplay).length === 0) {
      dateRange = moment.range(this.state.startDate, this.state.endDate);
    } else {
      const dataStartDate = formatDateFromAPI(this.state.tripData.startDate);
      const dataEndDate = formatDateFromAPI(this.state.tripData.endDate);
      dateRange = moment.range(dataStartDate, dataEndDate);
    }

    const listDates = Array.from(dateRange.by("days"));

    return (
      <div>
        {listDates.map(day => {
          return (
            <div key={day} className={"print_date"}>
              {console.log("date: ", day.toISOString())}
              <div className={"dates"}>
                <p className={"display_dates"}>{formatDate(day)}</p>
                <p className={"display_dates"}>{formatDay(day)}</p>
              </div>
              <AddLocationForEachDay
                date={day.toISOString()}
                itineraryPerDay={
                  this.state.tripDisplay[day.toISOString()]
                    ? this.state.tripDisplay[day.toISOString()]
                    : []
                }
                editTrip={itineraryPerDay => this.editTrip(itineraryPerDay)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  generateItinerary = () => {
    const travelDates = this.printDatesList();
    this.setState(() => {
      return {
        travelDates
      };
    });
  };

  render() {
    console.log(this.state.tripsData);
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
        {/* <p>DESTINATION</p> */}
        {/* <SelectCountry /> */}
        <button
          data-testid={"submitDateButton"}
          className={"submit_date_button"}
          onClick={this.generateItinerary}
        >
          <i className="far fa-paper-plane"></i>
        </button>
        <button onClick={this.saveTrip}>Save Trip</button>

        {/* <select>
          {this.state.tripsData.forEach(trip => {
            return <option value={trip.name}>{trip.name}</option>;
          })}
        </select> */}

        <div className={"travel_dates"}>{this.state.travelDates}</div>
      </div>
    );
  }
}

export default DatePicker;
