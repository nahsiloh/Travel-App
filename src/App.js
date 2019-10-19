import React from "react";
import "./App.css";
import CurrencyConverter from "./common/currency_converter";
import DatePicker from "./components/date_picker";
import TripSelector from "./components/trip_selector";
import ExistingTrip from "./components/existing_trip";

function App() {
  return (
    <div className="App">
      <h1>Lets plan your next trip!</h1>
      <TripSelector />
    </div>
  );
}

export default App;
