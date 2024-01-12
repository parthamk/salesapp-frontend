// Import React, useState for state management, axios for HTTP requests, and useNavigate from react-router-dom for programmatic navigation
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Functional component for user login
const Login = ({ onLogin }) => {
  // State variables for login form fields and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Access the navigate function from react-router-dom for redirection
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

        // Check if any of the required fields is empty
        if (!email || !password) {
          // Set the error message for empty fields
          setError('All fields are mandatory');
          return;
        }
        
    try {
      // Make a POST request to the backend API for user login
      const response = await axios.post('https://salesapp-backend.onrender.com/auth/login', {
        email,
        password,
      });

      // Extract the token from the response data
      const token = response.data.token;

      // Add the token to the headers for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Save the token in local storage
      localStorage.setItem('token', token);

      // Call the onLogin callback with the user data
      onLogin(response.data.user);
      
      // Redirect to the addSales page after successful login
      navigate('/addSales');
    } catch (error) {
      // Log and handle errors
      console.error('Login error:', error.response);

      // Check if the error response has a status code of 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        // Set the error message for invalid email or password
        setError('Invalid email or password. Please try again.');
      } else {
        // Set a generic error message for unexpected errors
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  // JSX for the component
  return (
    // Container for the content
    <div className="container">
      {/* Heading for the login form */}
      <h2 className="text-center my-4">LOGIN FORM</h2>
      {/* Form with onSubmit event handler pointing to the handleLogin function */}
      <form onSubmit={handleLogin} className='mb-3'>
        {/* Form field for the email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          {/* Input field with value and onChange handlers */}
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Form field for the password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          {/* Input field with value and onChange handlers */}
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Submit button for the form */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {/* Conditional rendering of error message if there is an error */}
      {error && 
        <div className='alert alert-danger'>{error}</div>
      }
    </div>
  );
};

// Export the Login component
export default Login;
