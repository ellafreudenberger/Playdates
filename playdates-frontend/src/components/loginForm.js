import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup} from 'react-bootstrap';
import '../index.css'

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
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
      <div className='loginContainer'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
                autoComplete="off"
              />
            </InputGroup>
          </Form.Group>
  
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="off"
            />
          </Form.Group>
  
          <Button className="loginButton" type="submit">
            Login
          </Button>
  
          {loginError && <p className="error-message">Sorry, there was an error logging you in!</p>}
        </Form>
      </div>
    );
  };
export default Login;