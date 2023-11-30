import React, { useState, useEffect } from 'react';

export const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    // Check if the user is authenticated
    fetch('http://localhost:3000/admin', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated) {
          // If authenticated, set the state and proceed to fetch user and booking data
          setAuthenticated(true);
  
          // Fetch user data
          fetch('http://localhost:3000/api/admin/users')
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch((error) => console.error('Error fetching user data', error));
  
          // Fetch booking data
          fetch('http://localhost:3000/api/admin/savedbookings')
            .then(response => response.json())
            .then(data => setBookingData(data))
            .catch((error) => console.error('Error fetching booking data', error));
        } else {
          setAuthenticated(false);
        }
      })
      .catch((error) => console.error('Error checking authentication', error));
  }, []);

  return (
      <div>
        {authenticated ? (
          <div>
            {console.log('User Data Length:', userData.length)}
            {userData.length > 0 ? (
              <div>
                <h1>Clients</h1>
                <ul>
                  {userData.map((user) => (
                    <li key={user._id}>
                      {user.first_name} {user.last_name} | Dog: {user.dog_name} (Age: {user.dog_age}, Breed: {user.breed}, Behavior: {user.behavior})
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No clients have registered yet!</p>
            )}
    
            {console.log('Booking Data Length:', bookingData.length)}
            {bookingData.length > 0 ? (
              <div>
                <h1>Bookings</h1>
                <ul>
                  {bookingData.map((booking) => (
                    <li key={booking._id}>
                      {booking.service} - {booking.start_date} {booking.start_time} to {booking.end_date} {booking.end_time} at {booking.street}, {booking.apartment ? `${booking.apartment},` : ''} {booking.city}, {booking.state} {booking.zipcode} - {booking.notes}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No bookings available!</p>
            )}
          </div>
        ) : (
          <p className="noRegisteredClients">No clients have registered yet!</p>
        )}
      </div>
    );
        }
export default Admin;

