const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admins = require('../models/admin')

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Playdates', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Admin data
const adminData = [
  {
    first_name: 'Ella',
    last_name: 'Freudenberger',
    username: 'freudella',
    password: 'Ringo123!',
  },
  {
    first_name: 'Lily',
    last_name: 'Hopkins',
    username: 'hoplily',
    password: 'Otis123!',
  },
];

// Hash passwords before seeding
const hashPasswords = async () => {
  try {
    for (const admin of adminData) {
      admin.password = await bcrypt.hash(admin.password, 10);
    }
    seedDatabase();
  } catch (error) {
    console.error('Error hashing passwords', error);
    mongoose.connection.close();
  }
};

// Seed the database with admin data
const seedDatabase = () => {
  Admins.insertMany(adminData) 
    .then(() => {
      console.log('Database seeded successfully');
      mongoose.connection.close();
    })
    .catch((error) => console.error('Error seeding database', error));
};

hashPasswords();
