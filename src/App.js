import React from "react";
import "./App.css";
import TripSelector from "./components/trip_selector";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AppRouter from "./components/header";
import ExistingTrip from "./components/existing_trip";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Lets fly away!</h1>

        <AppRouter />
        <Switch>
          <Route exact path="/" component={() => <Login />} />
          <Route exact path="/selecttrip" component={() => <TripSelector />} />
          <Route
            exact
            path="/existingtrip"
            component={() => <ExistingTrip />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
