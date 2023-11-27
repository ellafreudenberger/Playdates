const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Playdates', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const adminCalendarSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  availableSlots: Number,
  bookedSlots: Number,
}, { collection: 'AdminCalendar' });

const AdminCalendar = mongoose.model('AdminCalendar', adminCalendarSchema);

module.exports = AdminCalendar;
