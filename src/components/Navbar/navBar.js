import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

function NavBar(props) {
  return (
    <div>
      <header data-testid="Navbar">
        <Link to="/tripSelect">Trip Selector</Link>
        <Link to="/" onClick={props.logout}>
          Logout
        </Link>
      </header>
      <h1>Lets fly away!</h1>
    </div>
  );
}

export default NavBar;
