import React, {
  useEffect,
  useState,
  useReducer,
  createContext,
  Dispatch,
} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TripSelector from "../TripSelector";
import Login from "../LoginForm";
import CreateUser from "../CreateUser";
import NavBar from "../Navbar";
import { logoutUser } from "../../api/api";

import reducer from "../../reducer";
import { AppState, initialState } from "../../reducer/state";

import "./App.css";
import { Action } from "../../reducer/actions";
export interface ReducerContextType {
  state: AppState;
  dispatch: Dispatch<Action>;
}

export const ReducerContext = createContext<ReducerContextType>({
  state: initialState,
  dispatch: () => null,
});

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      <ReducerContext.Provider value={{ state, dispatch }}>
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
                      <Login checkIsLoggedIn={checkIsLoggedIn} />
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
      </ReducerContext.Provider>
    );
  } else {
    return (
      <ReducerContext.Provider value={{ state, dispatch }}>
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
            </Switch>
          </Router>
        </section>
      </ReducerContext.Provider>
    );
  }
};

export default App;
