import React from "react";
import "./App.css";
import CurrencyConverter from "./common/currency_converter";
import DatePicker from "./components/date_picker";

function App() {
  return (
    <div className="App">
      <h1>Lets plan your next trip!</h1>
      <DatePicker />
      {/* <CurrencyConverter /> */}
    </div>
  );
}

export default App;
