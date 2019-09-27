import React from "react";
import "./App.css";
import GenerateItinerary from "./components/generate_itinerary";

function App() {
  return (
    <div className="App">
      <h1>Lets plan your next trip!</h1>
      <GenerateItinerary />
    </div>
  );
}

export default App;
