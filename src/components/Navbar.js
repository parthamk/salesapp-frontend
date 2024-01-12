// Import React and Link component from react-router-dom for navigation
import React from 'react';
import { Link } from 'react-router-dom';

// Import Bootstrap styles and JavaScript bundle
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Navbar component that accepts isAuthenticated and user as props
const Navbar = ({ isAuthenticated, user }) => {
  // JSX for the Navbar
  return (
    // Navigation bar with dark background
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {/* Container for the navbar content */}
      <div className="container-fluid">
        {/* Link to the home page with the brand name */}
        <Link className="navbar-brand" to="/">SALES APP</Link>
        {/* Button for toggling the responsive navbar on small screens */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Collapsible navbar content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navbar items list */}
          <ul className="navbar-nav">
            {/* Conditional rendering based on authentication status */}
            {isAuthenticated ? (
              // If authenticated, show these navigation items
              <>
                <li className="nav-item">
                  {/* Link to the addSales page */}
                  <Link className="nav-link" to="/addSales">ADD SALES</Link>
                </li>
                <li className="nav-item">
                  {/* Link to the topFiveSales page */}
                  <Link className="nav-link" to="/topFiveSales">TOP 5 SALES</Link>
                </li>
                <li className="nav-item">
                  {/* Link to the todaysSales page */}
                  <Link className="nav-link" to="/todaysSales">TODAY'S TOTAL REVENUE</Link>
                </li>
                <li className="nav-item">
                  {/* Link to the logout page with user email as the title */}
                  <Link className="nav-link" to="/logout" title={user?.email || 'Logout'}>LOGOUT</Link>
                </li>
              </>
            ) : (
              // If not authenticated, show these navigation items
              <>
                <li className="nav-item">
                  {/* Link to the login page */}
                  <Link className="nav-link" to="/login">LOGIN</Link>
                </li>
                <li className="nav-item">
                  {/* Link to the register page */}
                  <Link className="nav-link" to="/">REGISTER</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;