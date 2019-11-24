import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function NavBar(props) {
  return (
    <header data-testid="Navbar">
      <Link to="/" onClick={props.logout}>
        Logout
      </Link>
    </header>
  );
}

export default NavBar;
