// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../src/pages/login';
import Register from '../src/pages/register';
import AddSales from '../src/pages/addsales';
import TopSales from '../src/pages/topsales';
import TodayRevenue from '../src/pages/today';
import Navbar from '../src/components/navbar';
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/check-auth', {
          withCredentials: true,
        });
        console.log(response.data.isAuthenticated);
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication status:', error.message);
      }
    };

    checkAuthenticationStatus();
  }, []);
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/addsales"
          element={<PrivateRoute component={AddSales} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/topsales"
          element={<PrivateRoute component={TopSales} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/todayrevenue"
          element={<PrivateRoute component={TodayRevenue} isAuthenticated={isAuthenticated} />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
