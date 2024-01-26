// Import React, useState for state management, axios for HTTP requests, and useNavigate from react-router-dom for programmatic navigation
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Functional component for user login
const Login = ({ onLogin }) => {
  // State variables for login form fields and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  
  // Access the navigate function from react-router-dom for redirection
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

        // Check if any of the required fields is empty
        if (!email || !password) {
          // Set the error message for empty fields
          toast.error('All fields are mandatory');
          return;
        }
        
    try {
      setLoading(true); // Set loading to true when the form is submitted

      // Make a POST request to the backend API for user login
      const response = await axios.post('https://salesapp-backend.onrender.com/auth/login', {
        email,
        password,
      });

      // console.log('Login response:', response);

      // Extract the token from the response data
      const token = response.data.token;
      // Decode the JWT to get user ID

      // Add the token to the headers for subsequent requests
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Save the token in session storage
      sessionStorage.setItem('token', token);

      // console.log('User data', response.data.user);

      // Call the onLogin callback with the user data
      onLogin(response.data.user)

      setEmail("");
      setPassword("")
      toast.success("User Authenticated.. Login Success!");
      
      // Delay navigation for a short time to allow the loading animation to be visible
      setTimeout(() => {
        navigate('/addSales');
      }, 3000); // Adjust the delay time as needed
    } catch (error) {
      // Log and handle errors
      console.error('Login error:', error.response);

      // Check if the error response has a status code of 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        // Set the error message for invalid email or password
        toast.error('Invalid email or password. Please try again.');
      } else {
        // Set a generic error message for unexpected errors
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
    finally{
      setLoading(false);
    }
  };


  

  // JSX for the component
  return (
    // Container for the content
    <div className="container">
      {/* Heading for the login form */}
      <h2 className="text-center my-4">LOGIN FORM</h2>
      <span className='login-spinner-container'>
        {loading && 
          <>
            <div className="loading-spinner"></div>
            <div className='ms-2'>Redirecting please wait...</div>
          </>
        }
        
      </span>
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
        <div>
          <Link to="/">Don't have a account? Create one now.</Link>
        </div>
      </form>
      
      <ToastContainer />
      {/* Conditional rendering of error message if there is an error */}
      {/* {error && 
        <div className='alert alert-danger'>{error}</div>
      } */}
    </div>
  );
};

// Export the Login component
export default Login;
