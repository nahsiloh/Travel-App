import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { logoutUser } from "../api/api";

function NavBar() {
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      return err.message;
    }
  };

  return (
    <header>
      <Link to="/" onClick={logout}>
        Logout
      </Link>
      <Link to="/createtrip">New Trip</Link>
    </header>
  );
}

export default NavBar;
