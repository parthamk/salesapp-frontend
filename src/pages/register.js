import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if all fields are filled
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Make a request to register the user
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      // Handle successful registration
      if (response.status === 201) {
        alert('Registration successful! Please log in.'); // Show alert
        console.log('Registration successful:', response.data); // Log success message
        // Redirect to the login page or handle it as needed
      } else {
        // Handle other status codes
        console.error('Registration failed:', response.data.message);
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="mt-1">
      <h1 className="text-center mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        REGISTRATION FORM
      </h1>
      <div className="container">
        <div className="p-4 rounded shadow-sm bg-white">
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                FIRST NAME
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                LAST NAME
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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

export default Register;
