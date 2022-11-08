import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [createUser, { error }] = useMutation(CREATE_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="login-main">
      <div className="login-sheet-background"></div>
      <form className="login-sheet" onSubmit={handleFormSubmit}>
        <h1 className="login-title">Create an Account</h1>
        <div id="email-password-wrapper">
          <h4 className="login-epass">First Name</h4>
          <input
            className="login-epass-input"
            placeholder="First Name"
            name="firstName"
            type="firstName"
            id="firstName"
            value={formState.firstName}
            onChange={handleChange}
          />
          <h4 className="login-epass">Last Name</h4>
          <input
            className="login-epass-input"
            placeholder="Last Name"
            name="lastName"
            type="lastName"
            id="lastName"
            value={formState.lastName}
            onChange={handleChange}
          />
          <h4 className="login-epass">Email</h4>
          <input
            className="login-epass-input"
            placeholder="Your email"
            name="email"
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
          />
          <h4 className="login-epass">Password</h4>
          <input
            className="login-epass-input"
            placeholder="******"
            name="password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
          />
          {error && <div>Sign up failed</div>}
        </div>
        <button type="submit" value="Sign Up" className="login-submit-btn">
          Sign Up
        </button>
    <div className="login-copyright-s">
        @2022 Gear Swap™ All rights reserved
    </div>
      </form>
    </main>
  );
};
export default Signup;
