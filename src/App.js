import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';

import AddSales from './components/Pages/AddSales';
import TopFiveSales from './components/Pages/TopFiveSales';
import TodaysSale from './components/Pages/TodaysSale';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Logout from './components/Pages/Logout';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); //Add user state

  const handleLogin = (userData) => {
    // Set isAuthenticated to true when the user successfully logs in
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    // Set isAuthenticated to false when the user logs out
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/addSales' element={<AddSales />} />
        <Route path='/topFiveSales' element={<TopFiveSales />} />
        <Route path='/todaysSales' element={<TodaysSale />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/logout' element={<Logout onLogout={handleLogout} />} />
      </Routes>
    </Router>
  )
}

export default App