import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'

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

  const handleSubmit = async (event) => {
    event.preventDefault();

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
     <h2 className="adminLoginTitle">Dog Sitters Login</h2>
      <form onSubmit={handleSubmit} className='adminLoginForm'>
        <label htmlFor="username">Username</label>
        <input 
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
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
          autoComplete="off"
        />

        <button type="submit" className='adminLoginButton'>
          Login
        </button>

        {loginError && <p className="error-message">Sorry, you are not permitted!</p>}
      </form>
    </div>
  );
};

export default AdminLoginForm;
