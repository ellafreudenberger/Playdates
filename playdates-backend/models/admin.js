const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Playdates', {
 useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usersSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
 },
 { collection: 'Admins' });

const Admins = mongoose.model('Admins', usersSchema);

module.exports = Admins;