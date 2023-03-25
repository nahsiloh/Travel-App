import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
// import Dataset from "../data/skateboard-parks.json";

type Viewport = {
  latitude: number;
  longtitude: number;
  width: string;
  height: string;
  zoom: number;
};

type MapProps = {
  properties: { PARK_ID: string };
  geometry: { coordinates: number[] };
};

const Map: React.FC = () => {
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 45.4211,
    longtitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport: Viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {/* {Dataset.features.map((park: MapProps) => {
          return (
            <Marker
              key={park.properties.PARK_ID}
              latitude={park.geometry?.coordinates[1]}
              longitude={park.geometry?.coordinates[0]}
            >
              <div>skate</div>
            </Marker>
          );
        })} */}
      </ReactMapGL>
    </div>
  );
};

export default Map;
