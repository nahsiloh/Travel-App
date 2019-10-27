import React from "react";
import axios from "axios";
import uuidv1 from "uuid/v1";

import "../static/date_picker.css";

import { formatDate, formatDay, formatDateFromAPI } from "./format_dates";
import AddLocationForEachDay from "./add_location_for_each_day";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

const baseUrl = "http://localhost:5000";

class ExistingTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      travelDates: [],
      tripData: { name: "" },
      tripDisplay: {}
    };
  }

  componentDidMount() {
    const url = `${baseUrl}/trips/` + this.props.tripId;
    axios
      .get(url, { withCredentials: true })
      .then(res => {
        const trip = res.data;
        trip.itinerary.map(t => {
          const s = new Date(t.date);
          t.date = moment(s).format("D MMMM YYYY");
        });

        const display = trip.itinerary.reduce((acc, cur) => {
          if (Array.isArray(acc[cur.date])) {
            acc[cur.date].push(cur);
          } else {
            acc[cur.date] = [cur];
          }
          return acc;
        }, {});

        this.setState({ tripDisplay: display, tripData: trip });
        console.log(this.state.tripData);
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
      const travelDetail = trip[date];
      travelDetail.forEach(item => {
        if (item._id === undefined) {
          itineraries.push(item);
        }
      });
    });

    itineraries.map(travelDetail => {
      const d = new Date(travelDetail.date);
      return moment(d).format();
    });

    const url = `${baseUrl}/trips/${this.props.tripId}`;
    axios.patch(
      url,
      { itinerary: this.state.tripData.itinerary.concat(itineraries) },
      { withCredentials: true }
    );

    // localStorage.removeItem("trip");

    // window.location = "/selecttrip";
  };

  printDatesList = () => {
    const dateRange = moment.range(
      this.state.tripData.startDate,
      this.state.tripData.endDate
    );

    const listDates = Array.from(dateRange.by("days"));

    return (
      <div>
        {listDates.map(day => {
          return (
            <div key={day} className={"print_date"}>
              <div className={"dates"}>
                <p className={"display_dates"}>{formatDate(day)}</p>
                <p className={"display_dates"}>{formatDay(day)}</p>
              </div>
              <AddLocationForEachDay
                dateToSave={formatDate(day)}
                dateToDisplay={formatDate(day)}
                itineraryPerDay={
                  this.state.tripDisplay[formatDate(day)]
                    ? this.state.tripDisplay[formatDate(day)]
                    : []
                }
                tripId={this.props.tripId}
              />
            </div>
          );
        })}
      </div>
    );
  };

  generateItinerary = () => {
    const travelDates = this.printDatesList();

    localStorage.removeItem("trip");

    this.setState(() => {
      return {
        travelDates
      };
    });
  };

  render() {
    return (
      <div data-testid={"Travel_Itinerary"} className={"itinerary_container"}>
        <button
          data-testid={"submitDateButton"}
          className={"submit_date_button"}
          onClick={this.generateItinerary}
        >
          <i className="far fa-paper-plane"></i>
        </button>
        <button onClick={this.saveTrip}>Save Trip</button>

        <div className={"travel_dates"}>{this.state.travelDates}</div>
      </div>
    );
  }
}

export default ExistingTrip;
