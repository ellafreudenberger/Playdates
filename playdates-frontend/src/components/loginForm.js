import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFancyButton from './buttons/fancy-button2';
import '../index.css';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Send the login data to the backend for validation
      const response = await fetch('http://localhost:3000/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.error || 'Invalid credentials');
        return;
      }

      // Login successful
      setLoginError('');
      navigate('/calendar'); // Redirect to the calendar page
    } catch (error) {
      console.error(error);
      setLoginError('An error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <div className="fancy-input-container">
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
              className="rounded-input"
              autoComplete="username" 
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="fancy-input-container">
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="rounded-input"
              autoComplete="current-password" 
            />
          </div>
        </div>
        <LoginFancyButton onClick={handleSubmit} />

      {loginError && (
        <p className="error-message">
          Sorry, that login entry doesn't match our records!
        </p>
      )}
      </form>
    </div>
  );
};

export default Login;
