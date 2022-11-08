import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
    const [createUser, {error}] = useMutation(CREATE_USER);

    const [signupState, setSignupState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        location: ''
    });

    const [emailValidationState, setEmailValidationState] = useState('');
    const [pwValidationState, setPwValidationState] = useState('');

    // update state when form changes
    const handleFormChange = (event) => {
        if (event.target.name === 'firstname-i') {
            setSignupState({ ...signupState, firstName: event.target.value });
        } else if (event.target.name === 'lastname-i') {
            setSignupState({ ...signupState, lastName: event.target.value });
        } else if (event.target.name === 'email-i') {
            setSignupState({ ...signupState, email: event.target.value });

            // check to make sure email is correct format
            const result = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(signupState.email);

            // if incorrect, set validation state to an error message
            if (!result) {
                setEmailValidationState('Please enter a valid email address.');
            } else {
                setEmailValidationState('');
            };
        } else if (event.target.name === 'password-i') {
            setSignupState({ ...signupState, password: event.target.value });

            // check to make sure password is at least 6 characters
            const result = /^[\w!@#$%^&*?]{6,}$/.test(signupState.password);

            // if incorrect, set validation state to an error message
            if (!result) {
                setPwValidationState('Please use a longer password.');
            } else {
                setPwValidationState('');
            };
        } else if (event.target.name === 'location-i') { 
            setSignupState({ ...signupState, location: event.target.value});
        } else {
            return false;
        };
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (emailValidationState !== '') {
            return false;
        };

        if (pwValidationState !== '') {
            return false;
        };

        try {
            const { data } = await createUser({
                variables: { ...signupState }
            });

            console.log(data.createUser)

            Auth.login(data.createUser.token);
        } catch (e) {
            console.error(e);
        };
    };

    return (
        <main className="login-main">
            <div className="login-sheet-background"></div>
            <form className="login-sheet" id='signup-form' onSubmit={handleFormSubmit} >
                <h1 className="login-title">Create an Account</h1>
                <div id="email-password-wrapper">

                    <h4 className="login-epass">* First Name</h4>
                    <input 
                        name="firstname-i" 
                        className="login-epass-input" 
                        placeholder="First Name" 
                        value={signupState.firstName}
                        onChange={handleFormChange} 
                    />
                    <h4 className="login-epass">* Last Name</h4>
                    <input 
                        name="lastname-i" 
                        className="login-epass-input" 
                        placeholder="Last Name" 
                        value={signupState.lastName}
                        onChange={handleFormChange} 
                    />
                    <h4 className="login-epass">* Email{emailValidationState !== '' && `   ${emailValidationState}`}</h4>
                    <input 
                        name="email-i" 
                        className="login-epass-input" 
                        placeholder="Email Address"
                        value={signupState.email} 
                        onChange={handleFormChange} 
                    />
                    <h4 className="login-epass">* Password{pwValidationState !== '' && `   ${pwValidationState}`}</h4>
                    <input 
                        type="password"
                        name="password-i" 
                        className="login-epass-input" 
                        placeholder="Password" 
                        value={signupState.password}
                        onChange={handleFormChange} 
                    />
                    <h4 className="login-epass">  Location</h4>
                    <input 
                        name="location-i" 
                        className="login-epass-input" 
                        placeholder="Location" 
                        value={signupState.location}
                        onChange={handleFormChange} 
                    />
                </div>
                <button id="signup-submit" type="submit" value="Sign Up" className="login-submit-btn">Create Account</button>
                <div className="login-copyright-s">@2022 Gear Swap™ All rights reserved</div>
            </form>
            {error && <p>Failed to sign up new user.</p>}
        </main>
    )
};
export default Signup;
