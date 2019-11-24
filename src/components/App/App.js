import React from "react";
import "./App.css";
import TripSelector from "../TripSelector/trip_selector";
import Login from "../LoginForm/LoginForm";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NavBar from "../Navbar/navBar";
import ExistingTrip from "../ExistingTrip/existing_trip";
import { logoutUser } from "../../api/api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
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

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <Router>
          <div className="App">
            <h1>Lets fly away!</h1>

            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <Login checkIsLoggedIn={this.checkIsLoggedIn} />
                )}
              />
            </Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className="App">
            <NavBar isLoggedIn={this.state.isLoggedIn} logout={this.logout} />
            <h1>Lets fly away!</h1>
            <TripSelector />
          </div>
        </Router>
      );
    }
  }
}

export default App;
