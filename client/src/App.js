import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from './pages/Signup'
import Profile from './pages/Profile';
import SingleGroup from './pages/SingleGroup';
import SingleListing from './pages/SingleListing'
import NoMatch from './pages/NoMatch'



function App() {
  return (
    <>
      <Router>
        <Header />
          <div>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/group/:id"
                element={<SingleGroup />}
              />
              <Route
                path="/listing/:id"
                element={<SingleListing />}
              />
              <Route
                path="*"
                element={<NoMatch />}
              />
            </Routes>
          </div>
        <Footer />
      </Router>
    </>
  )
}

export default App;