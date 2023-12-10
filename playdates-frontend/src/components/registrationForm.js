import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [UsernameErrorMessage, setUsernameErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    dog_name: '',
    dog_age: '',
    breed: '',
    behavior: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Basic information validation
      if (
        !formData.first_name ||
        !formData.last_name ||
        !formData.username ||
        !formData.password ||
        !formData.dog_name ||
        !formData.dog_age ||
        !formData.breed ||
        !formData.behavior
      ) {
        console.error('All fields are required.');
        return;
      }

      // Validate password strength so the user confirms password strength
      if (formData.password.length < 6) {
        console.error('Password must be at least 6 characters long.');
        return;
      }

      // Send the user data to the backend
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setUsernameErrorMessage(
          errorData.error || 'Sorry, this username is already taken!'
        );
        return;
      }

      const data = await response.json();
      console.log(data); // Log the response from the server
      console.log('Redirecting to Login page'); // Check that page redirection works
      navigate('/login'); // Redirect to Login page
    } catch (error) {
      console.error(error); // Log any error that occurs
    }
  };

  return (
    <div className="registrationContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="dog_name">Dog Name</label>
        <input
          type="text"
          name="dog_name"
          value={formData.dog_name}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="dog_age">Dog Age</label>
        <input
          type="text"
          name="dog_age"
          value={formData.dog_age}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="breed">Breed</label>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <label htmlFor="behavior">Behavior Notes</label>
        <input
          type="text"
          name="behavior"
          value={formData.behavior}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <button type="submit" className="SignupButton">
          Sign-Up for Playdates!
        </button>

        {UsernameErrorMessage && (
          <p className="error-message">Username is already taken!</p>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
