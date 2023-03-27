import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TripSelector from "../TripSelector";
import Login from "../LoginForm";
import CreateUser from "../CreateUser";
import NavBar from "../Navbar";
import { logoutUser } from "../../api/api";
import CreateTrip from "../CreateTrip";
import ExistingTrip from "../ExistingTrip";

import "./App.css";

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
                  <CreateTrip
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
