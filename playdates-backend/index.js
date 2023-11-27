require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const seedersScript = require('./seeders/login');
const cors = require('cors');
const Users = require('./models/user');
const AdminCalendar = require('./models/adminCalendar');

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

// Admin page route
app.get('/admin', async (req, res) => {
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

// Administrator calendar route
app.post('/admincalendar', async (req, res) => {
    try {
      const { title, start, end, availableSlots } = req.body;
  
      // Basic information validation
      if (!title || !start || !end || !availableSlots) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      // Create new event with the provided data
      const newEvent = new AdminCalendar({
        title,
        start,
        end,
        availableSlots
      });
  
      // Save event to the AdminCalendar collection
      const savedEvent = await newEvent.save();
      return res.status(200).json(savedEvent);
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Get all events from the admin calendar
app.get('/admincalendar', async (req, res) => {
  try {
    const events = await AdminCalendar.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events from admin calendar', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User calendar with sign-ups added route
app.post('/calendar', async (req, res) => {
  try {
    const eventId = req.body.eventId;
    const updatedEvent = await AdminCalendar.findByIdAndUpdate(
      eventId,
      { $inc: { bookedSlots: 1 } },
      { new: true }
    );

    // Calculate available slots based on the total slots and booked slots
    const availableSlots = updatedEvent.totalSlots - updatedEvent.bookedSlots;

    res.json({ bookedSlots: updatedEvent.bookedSlots, availableSlots });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
