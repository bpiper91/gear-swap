import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <header>
      <div className="header-wrapper">
        <div className="header-name">
          <Link to="/">Gear Swap!</Link>
        </div>
        <div className="navBtn-wrapper">
        {!loggedIn && (
          <div>
            <Link to="/signup" className="navBtn">
              Sign Up
            </Link>
            <Link to="/login" className="navBtn">
              Login
            </Link>
          </div>
        )}
        {/* {loggedIn && ( */}
        <div >
          <Link to="/profile" className="navBtn">
            Profile
          </Link>
        </div>
        {/* )} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
