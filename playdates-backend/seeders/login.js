// Seeder script 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Users = require('../models/user');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Playdates', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample user data
const userData = [
  {
      first_name: 'John',
      last_name: 'Doe',
      username: 'johnDoe10',
      password: 'password10', 
      dog_name: 'Buddy',
      dog_age: '3',
      breed: 'Labrador Retriever',
      behavior: 'aggressive towards other dogs',
    },
  {
      first_name: 'Jane',
      last_name: 'Smith',
      username: 'janeSmith9',
      password: 'securePass9',
      dog_name: 'Max',
      dog_age: '4',
      breed: 'Golden Retriever',
      behavior: 'separation anxiety',
    },
  // Add more sample user data 
];

// Hash passwords before seeding
const hashPasswords = async () => {
  try {
    for (const user of userData) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    seedDatabase();
  } catch (error) {
    console.error('Error hashing passwords', error);
    mongoose.connection.close();
  }
};

// Seed the database with user data
const seedDatabase = () => {
  Users.insertMany(userData)
    .then(() => {
      console.log('Database seeded successfully');
      mongoose.connection.close();
    })
    .catch((error) => console.error('Error seeding database', error));
};

hashPasswords();
