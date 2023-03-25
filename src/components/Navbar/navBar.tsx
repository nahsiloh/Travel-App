import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

type NavBarProps = {
  logout: (event: React.MouseEvent<HTMLAnchorElement>) => Promise<any>;
};

const NavBar: React.FC<NavBarProps> = ({ logout }) => {
  return (
    <div>
      <header data-testid="Navbar">
        <Link to="/tripSelect">Trip Selector</Link>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </header>
      <h1>Lets fly away!</h1>
    </div>
  );
};

export default NavBar;
