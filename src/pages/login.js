import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true } // Include credentials (cookies) in the request
      );

      if (response.status === 200) {
        // Successful login
        console.log('Login successful:', response.data);
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/addsales');
      } else {
        // Handle other status codes
        console.error('Login failed:', response.data.message);
        alert('Incorrect credentials. Please try again.');
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.status === 401) {
        // Unauthorized (incorrect credentials)
        alert('Incorrect credentials. Please try again.');
      } else if (error.response && error.response.status === 404) {
        // Not Found (user not registered)
        alert('User not registered. Please sign up.');
      } else {
        // Handle other errors
        console.error('Login failed:', error.message);
        alert('An error occurred. Please try again later.');
      }
    }
  };
 

  return (
    <div className="mt-1">
      <h1 className="text-center mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        LOGIN FORM
      </h1>
      <div className="container">
        <div className="p-4 rounded shadow-sm bg-white" style={{ width: '80%', margin: 'auto' }}>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                EMAIL
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                PASSWORD
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
