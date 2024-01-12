// Import React, useState for state management, BrowserRouter as Router, Routes, and Route from react-router-dom
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Navbar and different pages/components
import Navbar from './components/Navbar';
import AddSales from './components/Pages/AddSales';
import TopFiveSales from './components/Pages/TopFiveSales';
import TodaysSale from './components/Pages/TodaysSale';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Logout from './components/Pages/Logout';

// Main App component
const App = () => {
  // State variables for authentication status and user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle user login
  const handleLogin = (userData) => {
    // Set isAuthenticated to true and update user data when the user successfully logs in
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Set isAuthenticated to false and clear user data when the user logs out
    setIsAuthenticated(false);
    setUser(null);
  };

  // JSX for the component
  return (
    // Set up the BrowserRouter as the main routing component
    <Router>
      {/* Include the Navbar component at the top of the application */}
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      {/* Define routes for different pages using the Routes component */}
      <Routes>
        {/* Route for the home page with the Register component */}
        <Route path='/' element={<Register />} />
        {/* Route for the addSales page with the AddSales component */}
        <Route path='/addSales' element={<AddSales />} />
        {/* Route for the topFiveSales page with the TopFiveSales component */}
        <Route path='/topFiveSales' element={<TopFiveSales />} />
        {/* Route for the todaysSales page with the TodaysSale component */}
        <Route path='/todaysSales' element={<TodaysSale />} />
        {/* Route for the login page with the Login component and passing the handleLogin function as a prop */}
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        {/* Route for the logout page with the Logout component and passing the handleLogout function as a prop */}
        <Route path='/logout' element={<Logout onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

// Export the App component
export default App;
