// https://www.youtube.com/watch?v=lyRP_D0qCfk
import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Modal } from 'antd';
import '../index.css';
import { setHours } from 'date-fns';


const locales = {
  'en-US': require('date-fns/locale/'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


function BookingsCalendar() {
  const [bookedTimes, setBookedTimes] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null); // initial default is no calendar day has been selected yet
  const [modalVisible, setModalVisible] = useState(false); //determines initial visibility as unseen and later pops up when this state changes to true 
  const [venmoModalVisible, setVenmoModalVisible] = useState(false); //determines initial visibility as unseen and later pops up when this state changes to true 
 

  const [formData, setFormData] = useState({
    service: 'Walk',
    start_date: 'formattedDate',
    start_time: 'formattedTime',
    end_date: 'formattedDate',
    end_time: 'formattedTime',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipcode: '',
    notes: '',
  });

  const fetchBookedTimes = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/bookings');
      if (response.ok) {
        const data = await response.json();
        const bookedTimes = data.map((booking) => ({
          start: parse(
            `${booking.start_date}T${booking.start_time}`,
            'yyyy-MM-ddTHH:mm',
            new Date()
          ),
          end: parse(
            `${booking.end_date}T${booking.end_time}`,
            'yyyy-MM-ddTHH:mm',
            new Date()
          ),
        }));
  
        // Update the state with the fetched booked times
        setBookedTimes(bookedTimes);
      } else {
        console.error('Failed to fetch booked times');
      }
    } catch (error) {
      console.error('Error fetching booked times:', error);
    }
  }, [setBookedTimes]);  

  useEffect(() => {
    const fetchData = async () => {
      await fetchBookedTimes();
    };

    fetchData();

    // Include fetchBookedTimes in the dependency array
  }, [fetchBookedTimes]);

  function generateTimeOptions() {
    const options = [];
    const currentTime = new Date();
    const startOfDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
  
    for (let i = 0; i < 24 * 2; i++) {
      const time = new Date(startOfDay.getTime() + i * 30 * 60 * 1000); // Increment by 30 minutes
      const formattedTime = format(time, 'h:mm a');
      options.push(
        <option key={formattedTime} value={formattedTime}>
          {formattedTime}
        </option>
      );
    }
  
    return options;
  }
  

  const handleSelectSlot = (slotInfo) => {
    const { start } = slotInfo;
  
    // Set hours, minutes, seconds, and milliseconds to zero
    const formattedDate = format(setHours(start, 0, 0, 0, 0), 'yyyy-MM-dd');
    const formattedTime = format(start, 'HH:mm');
  
    setFormData({
      ...formData,
      start_date: formattedDate,
      end_date: formattedDate, // Assuming the end date is the same as the start date
      start_time: formattedTime,
      end_time: formattedTime, // Assuming the end time is the same as the start time
    });
  
    setSelectedSlot(slotInfo);
    setModalVisible(true);
  };
  

  // Function to handle the cancellation of the modal
  const handleModalCancel = () => {
    setSelectedSlot(null);
    setModalVisible(false);
  };

  const handleCloseVenmoModal = () => {
    setVenmoModalVisible(false);
  };
  

  const handleFormSubmit = async (formData) => {
    // Check if required fields are filled
    if (
      formData.start_date === 'formattedDate' ||
      formData.start_time === 'formattedTime' ||
      formData.end_date === 'formattedDate' ||
      formData.end_time === 'formattedTime' ||
      formData.street === '' ||
      formData.city === '' ||
      formData.state === '' ||
      formData.zipcode === ''
    ) {
      // Display an alert if any required field is empty
      alert('Please fill in all of the fields unless you do not have an apartment.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form submitted successfully:', response);
  
        // Reset the form data
        setFormData({
          service: 'Walk',
          start_date: 'formattedDate',
          start_time: 'formattedTime',
          end_date: 'formattedDate',
          end_time: 'formattedTime',
          street: '',
          apartment: '',
          city: '',
          state: '',
          zipcode: '',
          notes: '',
        });
  
        // Close the main modal
        handleModalCancel();
  
        // Open the Venmo modal only if the booking is successful
        setVenmoModalVisible(true);
  
        // Update booked times after successful form submission
        await fetchBookedTimes();
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  
  return (
    <div>
     <h1 className="calTitle"> Click on the days you would like to set up Playdates with us! </h1>
      <Calendar className='calendar'
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        selectable
        onSelectSlot={handleSelectSlot}
        views={['month']} // Set the views prop to include only the month view
        defaultView="month" // Set the default view to month
        events={bookedTimes} // Ensure events are passed here
      />
      <Modal
  open={!!modalVisible || !!selectedSlot}
  title=""
  onCancel={handleModalCancel}
  footer={[
    <Button key="cancel" onClick={handleModalCancel}>
      Cancel
    </Button>,
    <Button
      key="signup"
      type="primary"
      onClick={async () => await handleFormSubmit(formData)}
    >
      Book
    </Button>,
  ]}
>
  {/*Booking Form*/}
  <form onSubmit={(e) => e.preventDefault()}>
  <div className='bookingForm'>
    <label id="service">
      Service
      <select
        id="service"
        value={formData.service}
        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
      >
        <option value="Walk">Walk</option>
        <option value="Sitting">Sitting</option>
        <option value="Boarding">Boarding</option>
      </select>
    </label>
    <br />

    <label id="start_date">
      Start Date
      <input
        id="start_date"
        type="date"
        value={formData.start_date}
        onChange={(e) =>
          setFormData({ ...formData, start_date: e.target.value })
        }
      />
    </label>
    <br />

    <label id="start_time">
      Start Time
      <select
        id="start_time"
        value={formData.start_time}
        onChange={(e) =>
          setFormData({ ...formData, start_time: e.target.value })
        }
        >
        {generateTimeOptions()}
        </select>
    </label>
    <br />

    <label id="end_date">
      End Date
      <input
        id="end_date"
        type="date"
        value={formData.end_date}
        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
      />
    </label>
    <br />

    <label id="end_time">
      End Time
      <select
        id="end_time"
        value={formData.end_time}
        onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
      >
      {generateTimeOptions()}
      </select>
    </label>
    <br />

    <label id="street">
      Street
      <input
        id="street"
        type="text"
        value={formData.street}
        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
      />
    </label>
    <br />

    <label id="apartment">
      Apartment
      <input
        id="apartment"
        type="text"
        value={formData.apartment}
        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
      />
    </label>
    <br />

    <label id="city">
      City
      <input
        id="city"
        type="text"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
    </label>
    <br />

    <label id="state">
      State
      <input
        id="state"
        type="text"
        value={formData.state}
        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
      />
    </label>
    <br />

    <label id="zipcode">
      Zipcode
      <input
        id="zipcode"
        type="text"
        value={formData.zipcode}
        onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
      />
    </label>
    <br />

    <label id="notes">
      Notes for us!
      <input
        id="notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />
    </label>
    <br />
</div>
  </form>
  </Modal>

      {/* Venmo Modal */}
      <Modal
        open={venmoModalVisible}
        title="Scan Venmo QR Code"
        onCancel={handleCloseVenmoModal}
        footer={[
          <Button key="close" onClick={handleCloseVenmoModal}>
            Close
          </Button>,
        ]}
      >
        <img src="/images/venmo.jpeg" alt="Venmo QR Code" style={{ maxWidth: '100%' }} />
        <h1 className="thanksBooking">Thank you for booking with us!</h1>
        <h2 className="submitPayment">Please submit payment to our Venmo.</h2>
        <h3 className="rates">
          <ul className="pricing"> 
            <li className="service">Walk
              <ul className="prices">
                <li>30 Minutes - $15</li>
                <li>1 Hour - $30</li>
              </ul>
            </li>
            <li className="service">Sitting
              <ul className="prices">
                <li>1 Day - $80</li>
              </ul>
            </li>
            <li className="service">Boarding 
              <ul className="prices">
                <li>1 Day - $80</li>
              </ul>
            </li>
          </ul>
        </h3>
      </Modal>
    </div>
  )
};

export default BookingsCalendar