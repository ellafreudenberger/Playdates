import React, { useState, useEffect } from 'react';
import "../index.css";
import { parse, format } from 'date-fns';
import { Modal } from 'antd';


const tableHeaderStyle = {
  textAlign: 'left',
};

// Time formating
const formatTime = (time) => {
  try {
    const parsedTime = parse(time, 'HH:mm', new Date());
    console.log('Parsed Time:', parsedTime);
    const formattedTime = format(parsedTime, 'hh:mm a');
    console.log('Formatted Time:', formattedTime);
    return formattedTime;
  } catch (error) {
    console.error('Error formatting time:', error);
    return time; // Return the original time if there's an error
  }
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

const generateTimeOptions = (selectedDate, selectedBookingTime) => {
  const options = [];

  for (let i = 0; i < 24 * 2; i++) {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';

    // Manually construct the formatted time
    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const amPm = hours < 12 ? 'AM' : 'PM';
    const formattedTime = `${formattedHours}:${minutes} ${amPm}`;

    // Use the same formatted time for both display and value
    options.push(
      <option key={formattedTime} value={formattedTime} selected={formattedTime === selectedBookingTime}>
        {formattedTime}
      </option>
    );
  }

  return options;
};




// Edit bookings
const [isModalVisible, setIsModalVisible] = useState(false);
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

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
 

const handleEditClick = (bookingId) => {
  setEditingBookingId(bookingId);
  const bookingToEdit = bookingData.find((booking) => booking._id === bookingId);
  
  setEditedBooking({
    service: bookingToEdit.service,
    start_date: format(new Date(bookingToEdit.start_date), 'yyyy-MM-dd'),
    start_time: bookingToEdit.start_time,
    end_date: format(new Date(bookingToEdit.end_date), 'yyyy-MM-dd'),
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
      console.log('Edited Booking:', editedBooking);
  
      const response = await fetch(`http://localhost:3000/savedbookings/${editingBookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBooking),
      });
  
      console.log('Response:', response);
  
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

      // Close the modal
      setIsModalVisible(false);
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
              <th style={tableHeaderStyle} className="bookingsColumnTitle">Update</th>

            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.service}</td>
                <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                <td>{formatTime(booking.start_time)}
                {console.log('Booking Time:', booking.start_time)}
                {console.log('Formatted Time:', formatTime(booking.start_time))}
                </td> {/*to edit time format*/}
                <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                <td>{formatTime(booking.end_time)}</td>{/*to edit time format*/}
                <td>{booking.street}</td>
                <td>{booking.apartment}</td>
                <td>{booking.city}</td>
                <td>{booking.state}</td>
                <td>{booking.zipcode}</td>
                <td>{booking.notes}</td>
                <td>
                <button className='editButton hoverEffectd' onClick={() => { handleEditClick(booking._id); showModal(); }}>Edit</button>
                <button className='deleteButton hoverEffectc' onClick={() => deleteBooking(booking._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Edit Form */}
        <Modal
   className='bookingForm'
  open={isModalVisible}
  onOk={handleEditFormSubmit} // handle "Save" action
  onCancel={() => {
    setEditingBookingId(null);
    handleCancel(); // handle "Cancel" action
  }}
  okText="Save"
  cancelText="Cancel"
>
            <label className="formLabel" htmlFor="editedService">
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
  
            <label className="formLabel" htmlFor="editedStartDate">
  Start Date
  <input
    id="editedStartDate"
    type="date"
    name="start_date"
    value={editedBooking.start_date || ''}
    onChange={handleEditFormChange}
  />
</label>
<br />


  <label className="formLabel" htmlFor="editedStartTime">
  Start Time
  <select
    id="editedStartTime"
    name="start_time"
    value={editedBooking.start_time}
    onChange={handleEditFormChange}
  >
    {generateTimeOptions(editedBooking.start_date, editedBooking.start_time)}
  </select>
</label>
<br />

  
<label className="formLabel" htmlFor="editedEndDate">
  End Date
  <input
    id="editedEndDate"
    type="date"
    name="end_date"
    value={editedBooking.end_date || ''}
    onChange={handleEditFormChange}
  />
</label>
<br />

  <label className="formLabel" htmlFor="editedEndTime">
  End Time
  <select
    id="editedEndTime"
    name="end_time"
    value={editedBooking.end_time}
    onChange={handleEditFormChange}
  >
    {generateTimeOptions(editedBooking.end_date, editedBooking.end_time)}
  </select>
</label>
<br />
  
            <label className="formLabel" htmlFor="editedStreet">
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
  
            <label className="formLabel" htmlFor="editedApartment">
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
  
            <label className="formLabel" htmlFor="editedCity">
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
  
            <label className="formLabel" htmlFor="editedState">
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
  
            <label className="formLabel" htmlFor="editedZipcode">
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
  
            <label className="formLabel" htmlFor="editedNotes">
              Notes for us!
              <input
                id="editedNotes"
                name="notes"
                value={editedBooking.notes}
                onChange={handleEditFormChange}
              />
            </label>
            <br />        
      </Modal>
    </div>
  </div>
);
  
  }

export default Bookings;


