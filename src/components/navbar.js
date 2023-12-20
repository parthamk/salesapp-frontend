// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate,NavLink } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

const Navbar = () => {
  const history = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      // Make a request to your backend to check if the user is logged in
      const response = await axios.get('http://localhost:5000/api/auth/check-auth', {
        withCredentials: true, // Include credentials (cookies) in the request
      });

      // Update the state based on the authentication status
      setIsLoggedIn(response.data.isAuthenticated);
    } catch (error) {
      // Handle error (e.g., network error, server error)
      console.error('Error checking authentication status:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint on your backend
      await axios.post('http://localhost:5000/api/auth/logout', null, {
        withCredentials: true, // Include credentials (cookies) in the request
      });

      // Redirect to the login page or any other page after logout
      history.push('/login');
    } catch (error) {
      // Handle logout error
      console.error('Logout failed:', error.message);
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid bg-primary nav">
          <Link to='/' className="navbar-brand fs-5 text-white">SALES APP</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to='/addsales' className="nav-link ms-2 fs-5 style={{font-family: 'Open Sans', sans-serif;}}" activeclassname="active">ADD SALES</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/topsales' className="nav-link ms-2 fs-5 style={{font-family: 'Open Sans', sans-serif;}}" activeclassname="active">TOP 5 SALES</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/todayrevenue' className="nav-link ms-2 fs-5 style={{font-family: 'Open Sans', sans-serif;}}" activeclassname="active">TODAY'S TOTAL REVENUE</NavLink>
              </li>
              {isLoggedIn ? (
                <li className="nav-item">
                  <Link to="/" onClick={handleLogout} className="nav-link ms-2 fs-5">
                    LOGOUT
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link ms-2 fs-5">
                      LOGIN
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link ms-2 fs-5">
                      REGISTER
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
