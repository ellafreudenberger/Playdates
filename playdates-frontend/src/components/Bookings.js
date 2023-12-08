import React, { useState, useEffect } from 'react';
import "../index.css";
import { format } from 'date-fns';


const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tableRowStyle = {
  border: '1px solid #ddd',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [uniqueStartDates, setUniqueStartDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/savedbookings');
        if (response.ok) {
          const data = await response.json();
          setBookingData(data);

          // Extract unique start dates from the data
          const startDates = [...new Set(data.map((booking) => booking.start_date))];
          setUniqueStartDates(startDates);
        } else {
          console.error('Error fetching booking data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
  };

  const filteredBookings = selectedStartDate
    ? bookingData.filter((booking) => booking.start_date === selectedStartDate)
    : bookingData; 


const deleteBooking = async (bookingId) => {
  try {
    const response = await fetch(`http://localhost:3000/savedbookings/${bookingId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove the deleted booking from the local state
      setBookingData((prevData) => prevData.filter((booking) => booking._id !== bookingId));
    } else {
      console.error('Error deleting booking');
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
};


const generateTimeOptions = (bookedTimes, selectedBookingTime) => {
  const options = [];

  // Check if bookedTimes is defined
  if (bookedTimes) {
    for (let i = 0; i < 24 * 2; i++) {
      const hours = Math.floor(i / 2);
      const minutes = i % 2 === 0 ? '00' : '30';
      const formattedTime = format(new Date(0, 0, 0, hours, minutes), 'h:mm a');

      // Check if the current time option is booked
      const isBooked = bookedTimes.some((bookingTime) => {
        const bookingStartTime = format(bookingTime.start, 'h:mm a');
        const bookingEndTime = format(bookingTime.end, 'h:mm a');

        // Check if the formatted time is within the booking time range
        return (
          formattedTime >= bookingStartTime &&
          formattedTime < bookingEndTime &&
          formattedTime !== selectedBookingTime
        );
      });

      // Add the time option to the list only if it's not booked
      if (!isBooked) {
        options.push(
          <option key={formattedTime} value={formattedTime}>
            {formattedTime}
          </option>
        );
      }
    }
  }

  return options;
};


//editing bookings
const [editingBookingId, setEditingBookingId] = useState(null);
  const [editedBooking, setEditedBooking] = useState({
    service: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipcode: '',
    notes: '',
  });

  const handleEditClick = (bookingId) => {
    setEditingBookingId(bookingId);
    const bookingToEdit = bookingData.find((booking) => booking._id === bookingId);
    
    setEditedBooking({
      service: bookingToEdit.service,
      start_date: bookingToEdit.start_date,
      start_time: bookingToEdit.start_time,
      end_date: bookingToEdit.end_date,
      end_time: bookingToEdit.end_time,
      street: bookingToEdit.street,
      apartment: bookingToEdit.apartment,
      city: bookingToEdit.city,
      state: bookingToEdit.state,
      zipcode: bookingToEdit.zipcode,
      notes: bookingToEdit.notes,
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditedBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/savedbookings/${editingBookingId}`, {
        method: 'PUT', // Use PUT method for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBooking),
      });

      if (response.ok) {
        // Update the local state with the edited booking
        setBookingData((prevData) =>
          prevData.map((booking) =>
            booking._id === editingBookingId ? { ...booking, ...editedBooking } : booking
          )
        );

        // Reset the editing state
        setEditingBookingId(null);
        setEditedBooking({
          service: '',
          start_date: '',
          start_time: '',
          end_date: '',
          end_time: '',
          street: '',
          apartment: '',
          city: '',
          state: '',
          zipcode: '',
          notes: '',
        });
      } else {
        console.error('Error updating booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <div>
      <div className="bookingsContainer">
        <h1 className="bookingsHeader">Bookings</h1>
        <label htmlFor="startDate" className="dateLabel">
          <select id="startDate" onChange={handleStartDateChange} value={selectedStartDate || ''}>
            <option value="">All Dates</option>
            {uniqueStartDates.map((startDate) => (
              <option key={startDate} value={startDate}>
                {new Date(startDate).toLocaleDateString()}
              </option>
            ))}
          </select>
        </label>
        <table className="bookingsTable" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Service</th>
              <th style={tableHeaderStyle}>Start Date</th>
              <th style={tableHeaderStyle}>Start Time</th>
              <th style={tableHeaderStyle}>End Date</th>
              <th style={tableHeaderStyle}>End Time</th>
              <th style={tableHeaderStyle}>Street</th>
              <th style={tableHeaderStyle}>Apartment</th>
              <th style={tableHeaderStyle}>City</th>
              <th style={tableHeaderStyle}>State</th>
              <th style={tableHeaderStyle}>Zipcode</th>
              <th style={tableHeaderStyle}>Notes</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id} style={tableRowStyle}>
                <td style={tableCellStyle}>{booking.service}</td>
                <td style={tableCellStyle}>{new Date(booking.start_date).toLocaleDateString()}</td>
                <td style={tableCellStyle}>{booking.start_time}</td>
                <td style={tableCellStyle}>{new Date(booking.end_date).toLocaleDateString()}</td>
                <td style={tableCellStyle}>{booking.end_time}</td>
                <td style={tableCellStyle}>{booking.street}</td>
                <td style={tableCellStyle}>{booking.apartment}</td>
                <td style={tableCellStyle}>{booking.city}</td>
                <td style={tableCellStyle}>{booking.state}</td>
                <td style={tableCellStyle}>{booking.zipcode}</td>
                <td style={tableCellStyle}>{booking.notes}</td>
                <td style={tableCellStyle}>
                  <button className='editButton' onClick={() => handleEditClick(booking._id)}>Edit</button>
                  <button className='deleteButton' onClick={() => deleteBooking(booking._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Edit Form */}
        {editingBookingId && (
          <div className="editForm">
            <h2>Update Booking</h2>
            <label htmlFor="editedService">
              Service
              <select
                id="editedService"
                name="service"
                value={editedBooking.service}
                onChange={handleEditFormChange}
              >
                <option value="Walk">Walk</option>
                <option value="Sitting">Sitting</option>
                <option value="Boarding">Boarding</option>
              </select>
            </label>
            <br />
  
            <label htmlFor="editedStartDate">
              Start Date
              <input
                id="editedStartDate"
                type="date"
                name="start_date"
                value={editedBooking.start_date}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
  
            <label htmlFor="editedStartTime">
              Start Time
              <select
                id="editedStartTime"
                name="start_time"
                value={editedBooking.start_time}
                onChange={handleEditFormChange}
              >
                {generateTimeOptions().map((timeOption) => (
                  <option key={timeOption} value={timeOption}>
                    {timeOption}
                  </option>
                ))}
              </select>
            </label>
            <br />
  
            <label htmlFor="editedEndDate">
              End Date
              <input
                id="editedEndDate"
                type="date"
                name="end_date"
                value={editedBooking.end_date}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
  
            <label htmlFor="editedEndTime">
              End Time
              <select
                id="editedEndTime"
                name="end_time"
                value={editedBooking.end_time}
                onChange={handleEditFormChange}
              >
                {generateTimeOptions().map((timeOption) => (
                  <option key={timeOption} value={timeOption}>
                    {timeOption}
                  </option>
                ))}
              </select>
            </label>
            <br />
  
            <label htmlFor="editedStreet">
              Street
              <input
                id="editedStreet"
                type="text"
                name="street"
                value={editedBooking.street}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
  
            <label htmlFor="editedApartment">
              Apartment
              <input
                id="editedApartment"
                type="text"
                name="apartment"
                value={editedBooking.apartment}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
  
            <label htmlFor="editedCity">
              City
              <input
                id="editedCity"
                type="text"
                name="city"
                value={editedBooking.city}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
  
            <label htmlFor="editedState">
              State
              <input
                id="editedState"
                type="text"
                name="state"
                value={editedBooking.state}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
  
            <label htmlFor="editedZipcode">
              Zipcode
              <input
                id="editedZipcode"
                type="text"
                name="zipcode"
                value={editedBooking.zipcode}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
  
            <label htmlFor="editedNotes">
              Notes for us!
              <input
                id="editedNotes"
                name="notes"
                value={editedBooking.notes}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
  
            <button onClick={() => handleEditFormSubmit()}>Save</button>
            <button onClick={() => setEditingBookingId(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );  
  
  }

export default Bookings;


