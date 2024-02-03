// Import React, useState for state management, axios for HTTP requests, and useNavigate from react-router-dom for programmatic navigation
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Functional component for user registration
const Register = () => {
  // State variables for user registration form fields and error message
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  // Access the navigate function from react-router-dom for redirection
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Check if any of the required fields is empty
    if (!firstName || !lastName || !email || !password) {
      // Set the error message for empty fields
      toast.error('All fields are mandatory');
      return;
    }

    try {
      // Make a POST request to the backend API for user registration
      const response = await axios.post('https://salesapp-backend.onrender.com/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      
      // Save the token in session storage
      sessionStorage.setItem('token', response.data.token);

      // Show success message using Toastify
      toast.success('User Registered Successfully! Redirecting to login page...');
      
  
      // Clear form fields after successful registration
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');

      // Redirect to the login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 5000);

    } catch (err) {
      // Log and handle errors
      console.error(err.response);

      // Check if the error response has a status code of 400 (Bad Request)
      if (err.response && err.response.status === 400) {
        // Set the error message from the response data
        toast.error(err.response.data.message);
      } else {
        // Set a generic error message for unexpected errors
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  // JSX for the component
  return (
    // Container for the content
    <div className="container">
      {/* Heading for the registration form */}
      <h2 className="text-center my-4">REGISTRATION FORM</h2>
      {/* Form with onSubmit event handler pointing to the handleSubmit function */}
      <form onSubmit={handleSubmit} className='mb-3'>
        {/* Form field for the first name */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          {/* Input field with value and onChange handlers */}
          <input 
            type="text" 
            className="form-control" 
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        {/* Form field for the last name */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          {/* Input field with value and onChange handlers */}
          <input 
            type="text" 
            className="form-control" 
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
          <Link to="/login">Already have an account? login now.</Link>
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

// Export the Register component
export default Register;
