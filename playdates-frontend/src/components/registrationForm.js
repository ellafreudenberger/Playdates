import React, { useState } from 'react';
import bcrypt from 'bcrypt';

const RegistrationForm = () => {
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
      // Validate password strength
      if (formData.password.length < 6) {
        console.error("Password must be at least 6 characters long.");
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // Create new user with hashed password
      const newUser = {
        ...formData,
        password: hashedPassword,
      };

      // Send the user data to the backend
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      console.log(data); // Successfully posted!
    } catch (error) {
      console.error(error); // Error posting!
    }
  };

  return (
    <div>
      <h2>Sign up for Playdates!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="dog_name">Dog Name:</label>
        <input
          type="text"
          id="dog_name"
          name="dog_name"
          value={formData.dog_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="dog_age">Dog Age:</label>
        <input
          type="text"
          id="dog_age"
          name="dog_age"
          value={formData.dog_age}
          onChange={handleChange}
          required
        />

        <label htmlFor="breed">Breed:</label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          required
        />

        <label htmlFor="behavior">Behavior:</label>
        <input
          type="text"
          id="behavior"
          name="behavior"
          value={formData.behavior}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
