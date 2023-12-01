// Function to check availability based on the submitted form data
const checkAvailability = async (formData) => {
    const { service, start_date, start_time, end_date, end_time } = formData;

// Import Bookings model from MongoDB
    const Bookings = require('../models/booking')
  
    // Retrieve existing bookings for the selected date/time range
    const existingBookings = await Bookings.find({
      start_date: { $lte: end_date },
      end_date: { $gte: start_date },
    });
  
    console.log(existingBookings)
    
    // Implement availability rules based on the type of service
    switch (service) {
      case 'boarding':
        // Check if there is already a dog boarding booking for that day
        const boardingBookings = existingBookings.filter(
          (booking) => booking.service === 'boarding'
        );
        if (boardingBookings.length >= 1) {
          return { available: false, message: 'Dog boarding not available on this day.' };
        }
        break;
  
        case 'sitting':
            // Check the maximum allowed dog sitters per day
            const sittingBookings = existingBookings.filter(
              (booking) => booking.service === 'sitting'
            );
      
            // Check if there are already two sitting bookings or if there are no boarding bookings
            if (sittingBookings.length >= 2 || boardingBookings.length === 1) {
              return { available: false, message: 'Maximum dog sitters reached for this day.' };
            }
            break;
  
        case 'walk':
            // Check if there's already a walk with overlapping times
            const overlappingWalk = existingBookings.find(
              (booking) => booking.service === 'walk' &&
                booking.start_time < end_time &&
                booking.end_time > start_time
            );
            if (overlappingWalk) {
              return { available: false, message: 'Walk not available during this time.' };
            }
            break;
    }
  
    // If no availability issues, return success
    return { available: true, message: 'Service available.' };
  };
  
  module.exports = { checkAvailability };
  