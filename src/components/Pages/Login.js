import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform login API request
    try {
      const response = await axios.post('https://salesapp-backend.onrender.com/auth/login',{
        email,
        password,
      })

      const token = response.data.token;

      // Add the token to the headers for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // save the token in local storage
      localStorage.setItem('token', token);

      // console.log(token);

      // Call the onLogin callback with the user data
      onLogin(response.data.user);
      
      // Redirect or update state to indicate successful login
      navigate('/addSales'); //Redirect to the desired page after successful login
    } catch (error) {
      console.error('Login error:', error.response);

      if(error.response && error.response.status === 401){
        setError('Invalid email or password. Please try again');
      }else{
        setError('An unexpected error occurred. Please try again later');
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">LOGIN FORM</h2>
      <form onSubmit={handleLogin} className='mb-3'>
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

export default Login;
