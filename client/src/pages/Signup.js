import React from "react";

const Signup = () => {
    return (
        <main className="login-main">
            <div className="login-sheet-background"></div>
            <div className="login-sheet">
                <h1 className="login-title">Create an Account</h1>
                <div id="email-password-wrapper">
                    <h4 className="login-epass">* Email</h4>
                    <input className="login-epass-input" placeholder="Email Address"/>
                    <h4 className="login-epass">* Password</h4>
                    <input className="login-epass-input" placeholder="Password"/>
                    <h4 className="login-epass">* Phone Number</h4>
                    <input className="login-epass-input" placeholder="Phone Number"/>
                    <h4 className="login-epass">* Birthday</h4>
                    <input type="date" className="login-epass-input" min="2022-11-2" max="2023-12-31" />
                </div>
                <button type="submit" className="login-submit-btn">Sign Up</button>
                <div className="login-copyright">@2022 Gear Swap™ All rights reserved</div>
            </div>
        </main>
    )
};
export default Signup;
