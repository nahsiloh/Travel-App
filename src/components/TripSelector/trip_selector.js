import React from "react";
import DatePicker from "../DatePicker/date_picker";
import ExistingTrip from "../ExistingTrip/existing_trip";
import { fetchTrips } from "../../api/api";
import { withRouter } from "react-router-dom";
import "./trip_selector.css";

class TripSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripsData: [],
      tripName: ""
    };
  }

  componentDidMount = async () => {
    try {
      const response = await fetchTrips();
      this.setState({ tripsData: response });
    } catch (err) {
      return err.message;
    }
  };

  handleTripSelector = event => {
    this.setState({ tripName: event.target.value });
  };

  selectTrip = () => {
    if (this.state.tripName.length === 0) {
      this.props.history.push("/tripSelect/new");
    } else {
      this.props.checkTripName(this.state.tripName);
      this.props.history.push("/tripSelect/:tripId");
    }
  };

  render() {
    return (
      <div>
        <h2 className="tripSelector__heading">BOARDING SOON</h2>
        <section className="tripSelector__form">
          <h3>SELECT YOUR TRIP</h3>
          <select
            value={this.state.tripName}
            onChange={this.handleTripSelector}
            data-testid="trip_selector"
          >
            <option>Create a new Itinerary</option>
            {this.state.tripsData.map(trip => {
              return (
                <option key={trip._id} value={trip._id}>
                  {trip.name}
                </option>
              );
            })}
          </select>
          <button onClick={this.selectTrip}>Select!</button>
        </section>
      </div>
    );
  }
}

export default withRouter(TripSelector);
