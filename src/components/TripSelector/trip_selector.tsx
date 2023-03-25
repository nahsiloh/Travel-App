import React, { useEffect, useState } from "react";
import { fetchTrips } from "../../api/api";
import { useHistory, withRouter, RouteComponentProps } from "react-router-dom";
import "./trip_selector.css";

type TripSelectorProps = RouteComponentProps<{ id: string }> & {
  checkTripId: (tripId: string) => void;
};

type TripData = {
  _id: string;
  name: string;
};

const TripSelector: React.FC<TripSelectorProps> = ({ checkTripId }) => {
  const history = useHistory();

  const [tripsData, setTripsData] = useState<TripData[]>([]);
  const [tripId, setTripId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTrips();
        setTripsData(response);
      } catch (err) {
        return err;
      }
    };

    fetchData();
  }, []);

  const handleTripSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTripId(event.target.value);
  };

  const selectTrip = () => {
    if (tripId.length === 0) {
      history.push("/tripSelect/new");
    } else {
      checkTripId(tripId);
      history.push("/tripSelect/:tripId");
    }
  };

  return (
    <div>
      <h2 className="tripSelector__heading">BOARDING SOON</h2>
      <section className="tripSelector__form">
        <h3>SELECT YOUR TRIP</h3>
        <select
          value={tripId}
          onChange={handleTripSelector}
          data-testid="trip_selector"
        >
          <option>Create a new Itinerary</option>
          {tripsData.map((trip) => {
            return (
              <option key={trip._id} value={trip._id}>
                {trip.name}
              </option>
            );
          })}
        </select>
        <button onClick={selectTrip}>Select!</button>
      </section>
    </div>
  );
};

export default withRouter(TripSelector);
