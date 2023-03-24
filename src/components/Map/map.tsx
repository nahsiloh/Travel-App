import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Dataset from "../data/skateboard-parks.json";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 45.4211,
        longtitude: -75.6903,
        width: "100vw",
        height: "100vh",
        zoom: 10
      }
    };
  }

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          {Dataset.features.map(park => {
            return (
              <Marker
                key={park.properties.PARK_ID}
                latitude={park.geometry.coordinates[1]}
                longtitude={park.geometry.coordinates[0]}
              >
                <div>skate</div>
              </Marker>
            );
          })}
        </ReactMapGL>
      </div>
    );
  }
}

export default Map;
