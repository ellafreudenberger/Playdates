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

// Database connection
const connectDB = require('./database/dbconnect');
connectDB();

//Views path
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware to complete cross-origin requests between servers
app.use(cors());

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

    // Check if the password is correct using bcrypt
    const isPasswordValid = await bcrypt.compare(password, admin.password);

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

// Admin page route
app.get('/admin', authenticateAdmin, async (req, res) => {
  try {
    // Fetch user data from the database
    const userData = await Users.find();

    // Render the admin page with user data
    res.render('admin', { userData });
  } catch (error) {
    console.error('Error fetching user data', error);
    res.status(500).send('Internal Server Error');
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
    // Parse data from the request body
    const bookingFormData = req.body;
    console.log(bookingFormData)

    // Create a new booking with the form data
    const newBooking = new Bookings(bookingFormData);

    // Call the checkAvailability function
    const availabilityStatus = await checkAvailability(bookingFormData);

    // If the service is available, proceed with saving to the database
    if (availabilityStatus.available) { const savedBooking = await newBooking.save ()

      return res.status(200).json({ success: true, message: 'Booking successful.' });
    } else {
      // If the service is not available, return an error message to the frontend
      return res.status(400).json({ success: false, message: availabilityStatus.message });
    }
  } catch (error) {
    console.error('Error handling booking:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
