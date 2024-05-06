import React, { useState } from 'react';
import './login.css';
import Landing from './landing'; // Import the Landing component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLoggedIn(true); // Update state to indicate user is logged in
      } else {
        // Login failed, show error message
        setError('Invalid email or password. Please try again.');

        // Clear email and password fields after 3 seconds
        setEmail('');
        setPassword('');
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Conditionally render the Login form or Landing component based on loggedIn state
  return (
    <div className="login-container1">
      {loggedIn ? (
        <Landing />
      ) : (
        <div className="login-container">
          {error && <div className="error-message">{error}</div>}
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <br />
            <input
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye} // Show different eye icons based on showPassword state
                className="eye-icon"
                onClick={togglePasswordVisibility}
              />
            <br />
            <button type="submit">Login</button>
            
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
