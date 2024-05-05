import React, { useState } from 'react';
import './login.css';
import Landing from './landing'; // Import the Landing component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

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
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Conditionally render the Login form or Landing component based on loggedIn state
  return (
    <div className="login-container">
      {loggedIn ? (
        <Landing />
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
