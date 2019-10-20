import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function AppRouter() {
  return (
    <header>
      <Link to="/"></Link>
      <Link to="/createtrip"></Link>
    </header>
  );
}

export default AppRouter;
