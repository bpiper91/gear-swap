import React from "react";

// INSTRUCTIONS -- set <a> tags to <Link> tags to render the login && Signup pages with proper file locations
// ^ CONTINUED  -- use ' to="" ' instead of ' href="" ' if that helps lol

// ---------------ABOVE HAS BEEN COMPLETED... leaving comments up incase of error-------------------//

const Header = () => {
  return (
    <header className="header-main">
        <div className="header-wrapper">
            <div className="header-name"> <a href="/">Gear Swap!</a> </div>
            <div className="login-signup-wrapper">
                <div className="login-link">
                    <a href="/login">Login</a>
                </div>
                <div className="signup-link">
                    <a href="/Signup">Sign Up</a>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;
