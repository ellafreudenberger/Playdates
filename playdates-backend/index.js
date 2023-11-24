require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const seedersScript = require('./seeders/login');
const Users = require('./models/user');

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
        const newUser = new User({
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
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
