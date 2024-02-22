const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Playdates', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BookingsSchema = new mongoose.Schema({
  service: {
    type: String,
    enum: ['Walk', 'Sitting', 'Boarding'],
    required: true,
  },
  start_date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_date: { type: Date, required: true },
  end_time: { type: String, required: true },
  street: { type: String, required: true },
 apartment: { type: String, requird: false},
 city: { type: String, required: true },
 state: { type: String, require: true },
 zipcode: {type: Number, required: true},
  notes: { type: String, required: false },

}, { collection: 'Bookings' });

const Bookings = mongoose.model('Bookings', BookingsSchema);

module.exports = Bookings;
