import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
// NEEDS: code to validate email & login info
// NEEDS: upon validation, login button will take user to 'profile.js'

const Login = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const [login, {error}] = useMutation(LOGIN);

    // update state when form input changes
    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        };

        // clear form
        setFormState({
            email: '',
            password: ''
        });     
    };

    return (
        <div className="login-main">
            <div className="login-sheet">
                <form id='login' onSubmit={handleFormSubmit}>
                    <h1 className="login-title">Log In</h1>
                    <div id="email-password-wrapper">
                        <h4 className="login-epass">* Email</h4>
                        <input 
                            type="email" 
                            name='email'
                            className="login-epass-input" 
                            placeholder="Email Address"
                            value={formState.email}
                            onChange={handleFormChange} 
                        />
                        <h4 className="login-epass">* Password</h4>
                        <input 
                            type="password"
                            name='email'
                            className="login-epass-input" 
                            placeholder="Password" 
                            value={formState.password}
                            onChange={handleFormChange} 
                        />
                    </div>
                    <div className="rem-for-flex-container">
                        <div className="checkbox-text-flex">
                            <input label="true" type="checkbox" id="rem-button" name="remember" value="remember-me" />
                            <div className="remember-me-text">Remember Me</div>
                        </div>
                        <div className="forgot-pass">
                            <Link to="/">Forgot Password</Link>
                        </div>
                    </div>
                    <Link to="/profile" id="login-profile">
                        <button id="login-submit" type="submit" value="Login" className="login-submit-btn">Log In</button>
                    </Link>
                    <div className="register">Not registered yet? <Link to="/signup" className="login-signup-link">Create an account</Link></div>
                    <div className="login-copyright">@2022 Gear Swap™ All rights reserved</div>
                </form>
                {error && <p>Failed to log in user.</p>}
            </div>
        </div>
    )
};

export default Login;