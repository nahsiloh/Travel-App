import React from "react";
import "./App.css";

import TripSelector from "../TripSelector/trip_selector";
import Login from "../LoginForm/LoginForm";
import CreateUser from "../CreateUser/CreateUser.js";
import NavBar from "../Navbar/navBar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { logoutUser } from "../../api/api";
import DatePicker from "../DatePicker/date_picker";
import ExistingTrip from "../ExistingTrip/existing_trip";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      tripId: ""
    };
  }

  componentDidMount = () => {
    const checkSavedState = localStorage.getItem("isLoggedIn");
    this.setState({ isLoggedIn: checkSavedState });
  };

  logout = async () => {
    try {
      await logoutUser();
      this.setState({ isLoggedIn: false });
      localStorage.removeItem("isLoggedIn");
    } catch (err) {
      return err.message;
    }
  };

  checkIsLoggedIn = isLoggedIn => {
    this.setState({
      isLoggedIn
    });
    localStorage.setItem("isLoggedIn", true);
  };

  checkTripId = tripId => {
    this.setState({ tripId });
  };

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <section>
          <Router>
            <div className="App">
              <h1>Lets fly away!</h1>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => (
                    <div className="formFormat">
                      <Login
                        checkIsLoggedIn={this.checkIsLoggedIn}
                        {...this.props}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/createUser"
                  component={() => (
                    <div className="formFormat">
                      <CreateUser {...this.props} />
                    </div>
                  )}
                />
              </Switch>
            </div>
          </Router>
        </section>
      );
    } else {
      return (
        <section>
          <Router>
            <Switch>
              <Route
                exact
                path="/tripSelect"
                render={() => (
                  <div className="App">
                    <NavBar
                      isLoggedIn={this.state.isLoggedIn}
                      logout={this.logout}
                    />
                    <TripSelector checkTripId={this.checkTripId} />
                  </div>
                )}
              />
              <Route
                exact
                path="/tripSelect/new"
                render={() => (
                  <div className="App">
                    <NavBar
                      isLoggedIn={this.state.isLoggedIn}
                      logout={this.logout}
                    />
                    <DatePicker {...this.props} />
                  </div>
                )}
              />
              <Route
                exact
                path="/tripSelect/:tripId"
                render={() => (
                  <div className="App">
                    <NavBar
                      isLoggedIn={this.state.isLoggedIn}
                      logout={this.logout}
                    />
                    <ExistingTrip tripId={this.state.tripId} {...this.props} />
                  </div>
                )}
              />
            </Switch>
          </Router>
        </section>
      );
    }
  }
}

export default App;
