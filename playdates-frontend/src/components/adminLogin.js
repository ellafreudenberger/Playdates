import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import FancyButton from './buttons/fancy-button';

const AdminLoginForm = () => {
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
      const response = await fetch('http://localhost:3000/adminlogin', {
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
      navigate('/admin'); // Redirect to the admin page
    } catch (error) {
      console.error(error);
      setLoginError('An error occurred during login.');
    }
  };

  return (
    <div className="adminLoginContainer">
      <h2 className="adminLoginTitle">Dog Sitters</h2>
      <form onSubmit={handleSubmit} className="adminLoginForm">
        <label htmlFor="username">Username</label>
        <input
          className="adminInput"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
          autoComplete="off"
        />

        <label htmlFor="password">Password</label>
        <input 
          className="adminInput"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
          autoComplete="off"
        />

        <FancyButton onClick={handleSubmit} />
        {loginError && <p className="error-message">Sorry, you are not permitted!</p>}
      </form>
    </div>
  );
};

export default AdminLoginForm;
