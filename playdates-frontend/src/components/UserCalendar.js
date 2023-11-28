// https://www.youtube.com/watch?v=lyRP_D0qCfk
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Modal } from 'antd';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function BookingsCalendar() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [venmoModalVisible, setVenmoModalVisible] = useState(false);
  const [formData, setFormData] = useState({
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

  // Function to handle the selection of a time slot in the calendar
  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setModalVisible(true);
  };

  // Function to handle the cancellation of the modal
  const handleModalCancel = () => {
    setSelectedSlot(null);
    setModalVisible(false);
  };

   // Function to handle the submission of the form data
   const handleFormSubmit = async (formData) => {
    // Check if any of the required string fields are empty
    const requiredStringFields = ['service', 'start_date', 'start_time', 'end_date', 'end_time', 'address', 'notes'];
    const emptyField = requiredStringFields.find(field => formData[field].trim() === '');
  
    if (emptyField) {
      console.error(`${emptyField} field is required`);
      // You might want to display an error message to the user
      return;
    }
  
    try {
      // Make a POST request to your backend API
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form submitted successfully:', response);
  
        // After form submission, reset the form data and close the modal
        setFormData({
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
        handleModalCancel();
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Display an error message to users if needed
    }
  };

  // Function to handle the closing of the Venmo modal
  const handleCloseVenmoModal = () => {
    setVenmoModalVisible(false);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        selectable
        onSelectSlot={handleSelectSlot}
        views={['month']} // Set the views prop to include only the month view
        defaultView="month" // Set the default view to month
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
      onClick={() => handleFormSubmit(formData)}
    >
      Book
    </Button>,
  ]}
>
  {/*Booking Form*/}
  <form onSubmit={(e) => e.preventDefault()}>
    <label>
      Service:
      <select
        id="service"
        value={formData.service}
        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
      >
        <option value="walk">Walk</option>
        <option value="sitting">Sitting</option>
        <option value="boarding">Boarding</option>
      </select>
    </label>
    <br />

    <label>
      Start Date:
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

    <label>
      Start Time:
      <input
        id="start_time"
        type="time"
        value={formData.start_time}
        onChange={(e) =>
          setFormData({ ...formData, start_time: e.target.value })
        }
      />
    </label>
    <br />

    <label>
      End Date:
      <input
        id="end_date"
        type="date"
        value={formData.end_date}
        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
      />
    </label>
    <br />

    <label>
      End Time:
      <input
        id="end_time"
        type="time"
        value={formData.end_time}
        onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
      />
    </label>
    <br />

    <label>
      Street:
      <input
        id="street"
        type="text"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
    </label>
    <br />

    <label>
      Apartment:
      <input
        id="apartment"
        type="text"
        value={formData.apartment}
        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
      />
    </label>
    <br />

    <label>
      City:
      <input
        id="city"
        type="text"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
    </label>
    <br />

    <label>
      State:
      <input
        id="state"
        type="text"
        value={formData.state}
        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
      />
    </label>
    <br />

    <label>
      Zipcode:
      <input
        id="zipcode"
        type="text"
        value={formData.zipcode}
        onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
      />
    </label>
    <br />

    <label>
      Notes:
      <textarea
        id="notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />
    </label>
    <br />

  </form>
  </Modal>;

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
      </Modal>
    </div>
  );
}

export default BookingsCalendar;