import React, { useEffect, useState } from "react";
import "./App.css";

import TripSelector from "../TripSelector/trip_selector";
import Login from "../LoginForm/LoginForm";
import CreateUser from "../CreateUser/CreateUser";
import NavBar from "../Navbar/navBar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { logoutUser } from "../../api/api";
import DatePicker from "../DatePicker/date_picker";
import ExistingTrip from "../ExistingTrip/existing_trip";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tripId, setTripId] = useState("");

  useEffect(() => {
    const checkSavedState = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(checkSavedState === "true" ? true : false);
  }, []);

  const logout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      event.preventDefault();
      await logoutUser();
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    } catch (err) {
      return err;
    }
  };

  const checkIsLoggedIn = (isLoggedIn: boolean) => {
    setIsLoggedIn(isLoggedIn);
    localStorage.setItem("isLoggedIn", "true");
  };

  const checkTripId = (tripId: string) => {
    setTripId(tripId);
  };

  if (!isLoggedIn) {
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
                      checkIsLoggedIn={checkIsLoggedIn}
                      isLoggedIn={isLoggedIn}
                      tripId={tripId}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/createUser"
                component={() => (
                  <div className="formFormat">
                    <CreateUser
                      checkIsLoggedIn={checkIsLoggedIn}
                      isLoggedIn={isLoggedIn}
                      tripId={tripId}
                    />
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
                  <NavBar logout={logout} />
                  <TripSelector checkTripId={checkTripId} />
                </div>
              )}
            />
            <Route
              exact
              path="/tripSelect/new"
              render={() => (
                <div className="App">
                  <NavBar logout={logout} />
                  <DatePicker
                    checkIsLoggedIn={checkIsLoggedIn}
                    isLoggedIn={isLoggedIn}
                    tripId={tripId}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/tripSelect/:tripId"
              render={() => (
                <div className="App">
                  <NavBar logout={logout} />
                  <ExistingTrip
                    checkIsLoggedIn={checkIsLoggedIn}
                    isLoggedIn={isLoggedIn}
                    tripId={tripId}
                  />
                </div>
              )}
            />
          </Switch>
        </Router>
      </section>
    );
  }
};

export default App;
