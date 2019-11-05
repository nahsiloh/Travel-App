import React from "react";
import "./App.css";
import TripSelector from "./components/trip_selector";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import ExistingTrip from "./components/existing_trip";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  checkIsLoggedIn = isLoggedIn => {
    this.setState({
      isLoggedIn
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <h1>Lets fly away!</h1>

          <Switch>
            <Route
              exact
              path="/"
              component={() => <Login checkIsLoggedIn={this.checkIsLoggedIn} />}
            />
            <Route
              exact
              path="/selecttrip"
              component={() => <TripSelector />}
            />
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
}

export default App;
