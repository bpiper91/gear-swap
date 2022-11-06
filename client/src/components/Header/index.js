import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-main">
      <div className="header-wrapper">
        <div className="header-name">
          {" "}
          <Link to="/">Gear Swap!</Link>{" "}
        </div>
        <div className="login-signup-wrapper">
          <div className="navbar-link">
            <Link to="/login">Login</Link>
          </div>
          <div className="navbar-link">
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
