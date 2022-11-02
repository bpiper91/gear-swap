import React from 'react';

const Login = () => {
    return (
        <main className="login-main">
            <div className="login-sheet-background"></div>
            <div className="login-sheet">
                <h1 className="login-title">Login</h1>
                <div id="email-password-wrapper">
                    <h4 className="login-epass">* Email</h4>
                    <input className="login-epass-input" placeholder="Email Address" />
                    <h4 className="login-epass">* Password</h4>
                    <input className="login-epass-input" placeholder="Password" />
                </div>
                <div className="rem-for-flex-container">
                    <div className="checkbox-text-flex">
                        <input label="true" type="checkbox" id="rem-button" name="remember" value="remember-me" />
                        <div className="remember-me-text">Remember me</div>
                    </div>
                    <div className="forgot-pass">
                        <a href="/home">Forgot Password</a>
                    </div>
                </div>
                <input id="login-submit" type="submit" value="Login" className="login-submit-btn" />
                <div className="register">Not registered yet? <a href="/signup" className="login-signup-link">Create an account</a></div>
                <div className="login-copyright">@2022 Gear Swap™ All rights reserved</div>
            </div>
        </main>
    )
}
export default Login;