import React from 'react';
import { Link } from "react-router-dom";
// NEEDS: code to validate email & login info
// NEEDS: upon validation, login button will take user to 'profile.js'

const Login = () => {
    return (
        <div className="login-main">
            <div className="login-sheet">
                <h1 className="login-title">Login</h1>
                <div id="email-password-wrapper">
                    <h4 className="login-epass">* Username</h4>
                    <input name="user-i" className="login-epass-input" placeholder="Username"/>
                    <h4 className="login-epass">* Email</h4>
                    <input type="email" className="login-epass-input" placeholder="Email Address" />
                    <h4 className="login-epass">* Password</h4>
                    <input className="login-epass-input" placeholder="Password" />
                </div>
                <div className="rem-for-flex-container">
                    <div className="checkbox-text-flex">
                        <input label="true" type="checkbox" id="rem-button" name="remember" value="remember-me" />
                        <div className="remember-me-text">Remember me</div>
                    </div>
                    <div className="forgot-pass">
                        <Link to="/">Forgot Password</Link>
                    </div>
                </div>
                <Link to="/profile" id="login-profile">
                    <input id="login-submit" type="submit" value="Login" className="login-submit-btn" />
                </Link>
                <div className="register">Not registered yet? <Link to="/signup" className="login-signup-link">Create an account</Link></div>
                <div className="login-copyright">@2022 Gear Swap™ All rights reserved</div>
            </div>
        </div>
    )
}
export default Login;