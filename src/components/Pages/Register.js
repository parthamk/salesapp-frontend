import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://salesapp-backend.onrender.com/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      // Save the token in local storage (optional, depends on your application flow)
      localStorage.setItem('token', response.data.token);

      // Redirect to the login page
      navigate('/login');
    } catch (err) {
      console.error(err.response);

      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">REGISTRATION FORM</h2>
      <form onSubmit={handleSubmit} className='mb-3'>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form> 
      {error && 
        <div className='alert alert-danger'>{error}</div>
      }
    </div>
  );
};

export default Register;
