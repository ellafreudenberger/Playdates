require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const seedersScript = require('./seeders/login');
const cors = require('cors');
const Users = require('./models/user');
const Bookings = require('./models/booking')
const { checkAvailability } = require('./controllers/availabilityController')
const Admins = require('./models/admin');

const app = express();

// Session middleware
const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Database connection
const connectDB = require('./database/dbconnect');
connectDB();

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware to complete cross-origin requests between servers
app.use(cors());

app.get('/admin', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
});

// Welcome page route
app.get('/', (req, res) => {
    res.send("Welcome to our homepage");
});

// Middleware to authenticate admin
const authenticateAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the admin in the database based on the provided username
    const admin = await Admins.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set a flag in the request to indicate admin authentication
    req.isAdminAuthenticated = true;

    next();
  } catch (error) {
    console.error('Error authenticating admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin Login Route
app.post('/adminlogin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username
    const admin = await Admins.findOne({ username });

    // If the user doesn't exist
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a session upon successful login
    req.session.adminId = admin._id;

    // Login successful
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Users page route
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const userData = await Users.find();
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Retrieve all bookings from the database 
app.get('/api/admin/savedbookings', authenticateAdmin, async (req, res) => {
  try {
    const bookingData = await Bookings.find();
    res.json(bookingData);
  } catch (error) {
    console.error('Error fetching booking data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Registration route
app.post('/register', async (req, res) => {
  try {
      const { first_name, last_name, username, password, dog_name, dog_age, breed, behavior } = req.body;

      // Basic information validation
      if (!first_name || !last_name || !username || !password || !dog_name || !dog_age || !breed || !behavior) {
          return res.status(400).json({ error: "All fields are required." });
      }

      // Validate password strength
      if (password.length < 6) {
          return res.status(400).json({ error: "Password must be at least 6 characters long." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user with hashed password
      const newUser = new Users({
          first_name,
          last_name,
          username,
          password: hashedPassword,
          dog_name,
          dog_age,
          breed,
          behavior,
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      return res.status(200).json({ message: "Registration successful." });
  } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Sorry this username is already taken!" });
  }
});

// User login route
app.post('/userlogin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username
    const user = await Users.findOne({ username });

    // If the user doesn't exist
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Booking route
app.post('/bookings', async (req, res) => {
  try {
    // Assuming the request body contains booking information
    const { service, start_date, start_time, end_date, end_time, street, apartment, city, state, zipcode, notes } = req.body;

    // Create a new booking instance
    const newBooking = new Bookings({
      service,
      start_date,
      start_time,
      end_date,
      end_time,
      street,
      apartment,
      city,
      state,
      zipcode,
      notes,
    });

    // Save the booking to the database
    await newBooking.save();

    // Fetch all bookings from the database
    const allBookings = await Bookings.find();

    // Respond with the list of all bookings
    res.status(201).json(allBookings);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});