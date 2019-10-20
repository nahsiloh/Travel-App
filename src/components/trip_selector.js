import React from "react";
import axios from "axios";
import DatePicker from "./date_picker";
import ExistingTrip from "./existing_trip";

const baseUrl = "http://localhost:5000";

class TripSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripsData: [],
      tripName: ""
      // tripData: { name: "" },
      // tripDisplay: {}
    };
  }

  componentDidMount() {
    const url = `${baseUrl}/trips`;
    axios
      .get(url)
      .then(res => {
        this.setState({ tripsData: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleTripSelector = event => {
    this.setState({ tripName: event.target.value });
  };

  // fetchTrip = () => {
  //   const url = `${baseUrl}/trips/` + this.state.tripName;

  //   axios
  //     .get(url, { withCredentials: true })
  //     .then(res => {
  //       const trip = res.data;
  //       console.log(trip);
  //       localStorage.setItem(`${this.state.tripName}`, JSON.stringify(trip));

  //       const display = trip.itinerary.reduce((acc, cur) => {
  //         if (Array.isArray(acc[cur.date])) {
  //           acc[cur.date].push(cur);
  //         } else {
  //           acc[cur.date] = [cur];
  //         }
  //         return acc;
  //       }, {});

  //       this.setState({ tripDisplay: display, tripData: trip });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  selectTrip = () => {
    if (this.state.tripName.length === 0) {
      return (
        <DatePicker
          tripData={this.state.tripData}
          tripDisplay={this.state.tripDisplay}
        />
      );
    } else {
      // this.fetchTrip();

      return (
        <ExistingTrip
          tripId={this.state.tripName}
          // tripData={this.state.tripData}
          // tripDisplay={this.state.tripDisplay}
        />
      );
    }
  };

  render() {
    return (
      <div>
        <p>Select Your Trip</p>
        <select value={this.state.tripName} onChange={this.handleTripSelector}>
          <option>Create a new Itinerary</option>
          {this.state.tripsData.map(trip => {
            return <option value={trip._id}>{trip.name}</option>;
          })}
        </select>
        <this.selectTrip />
      </div>
    );
  }
}

export default TripSelector;
