import React from "react";
import axios from "axios";

import AddInputLocationBox from "./add_input_location_box";
import uuidv1 from "uuid/v1";
import "../static/add_location_for_each_day.css";

const baseUrl = "http://localhost:5000";

class AddLocationForEachDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfLocationsPerDay: [],
      trip: { itinerary: [] }
    };
  }

  fetchItinerary = () => {
    const url = `${baseUrl}/trips/5da80e5344a2330c94be22a8`;
    axios
      .get(url, { withCredentials: true })
      .then(res => {
        this.setState({
          trip: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  displayOneItineraryInput = () => {
    this.setState({
      trip: {
        itinerary: [
          ...this.state.trip.itinerary,
          { id: uuidv1(), destination: "", program: "", cost: "" }
        ]
      }
    });
  };

  updateLocation = (
    travelDetail,
    inputDestination,
    inputProgram,
    inputCost
  ) => {
    travelDetail.destination = inputDestination;
    travelDetail.program = inputProgram;
    travelDetail.cost = inputCost;
    this.setState({
      trip: {
        itinerary: [...this.state.trip.itinerary]
      }
    });
  };

  deleteLocation = travelDetail => {
    this.setState({
      trip: {
        itinerary: [
          ...this.state.trip.itinerary.filter(item => item !== travelDetail)
        ]
      }
    });
  };

  render() {
    console.log(this.state.trip.itinerary);
    return (
      <div>
        {/* <button onClick={this.fetchItinerary}>Get itinerary</button>
        <div>
          {this.state.trip.itinerary.map(i => {
            return (
              <div key={i._id}>
                <p>{i.program}</p>
                <p>{i.destination}</p>
                <p>{i.cost}</p>
                <p>{i.date}</p>
              </div>
            );
          })}
        </div> */}

        <div className={"each_date"}>
          <button
            id={"add_button_for_each_date"}
            data-testid={"add_button_for_each_date"}
            onClick={this.displayOneItineraryInput}
          >
            <i className="fas fa-plus"></i>
          </button>

          <div className={"list_of_locations"}>
            {this.state.trip.itinerary.map(travelDetail => {
              return (
                <AddInputLocationBox
                  key={travelDetail.id}
                  travelDetail={travelDetail}
                  updateLocation={(dest, prog, cost) =>
                    this.updateLocation(travelDetail, dest, prog, cost)
                  }
                  deleteItem={() => this.deleteLocation(travelDetail)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AddLocationForEachDay;
