import React, { useState, useEffect } from 'react';

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
        const response = await fetch('http://localhost:3000/api/admin/savedbookings');
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

    return (
      <div>
        <div>
          <h1>Bookings</h1>
          <label htmlFor="startDate"></label>
          <select id="startDate" onChange={handleStartDateChange} value={selectedStartDate || ''}>
            <option value="">All Dates</option>
            {uniqueStartDates.map((startDate) => (
              <option key={startDate} value={startDate}>
                {new Date(startDate).toLocaleDateString()}
              </option>
            ))}
          </select>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )

  }

export default Bookings;


