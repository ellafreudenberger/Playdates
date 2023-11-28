  // https://www.youtube.com/watch?v=lyRP_D0qCfk
  import React, { useState, useEffect } from 'react';
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
  
  const events = [
  // {
  //   title: "Walk",
  //   start: new Date(2023, 11, 1),
  //   end: new Date(2023, 11, 1),
  //    availableSlots: 10,
  //   bookedSlots: 5,
  // },
  // {
  //   title: "Boarding",
  //  start: new Date(2023, 11, 2),
  //    end: new Date(2023, 11, 2),
  //   availableSlots: 8,
  //    bookedSlots: 2,
  //  },
  ];
  
  function PlaydatesUserCalendar() {
    const [bookEvent, setBookEvent] = useState({ title: '', start: '', end: '', availableSlots: '0', bookedSlots: 0 });
    const [allEvents, setAllEvents] = useState([events]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [venmoModalVisible, setVenmoModalVisible] = useState(false);
   
    
    // eslint-disable-next-line
    const [remainingSlots, setRemainingSlots] = useState(0); 
    
    useEffect(() => {
      // Calculate remaining slots whenever allEvents or selectedEvent changes
      if (selectedEvent) {
        const event = allEvents.find((event) => event._id === selectedEvent._id);
        if (event) {
          const availableSlots = event.availableSlots || 0;
          const bookedSlots = event.bookedSlots || 0;
          setRemainingSlots(availableSlots - bookedSlots);
        }
      }
    }, [allEvents, selectedEvent]);

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          // Make a GET request to fetch events created already
          const response = await fetch('http://localhost:3000/admincalendar', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            // Parse response data in JSON format
            const eventData = await response.json();
  
            // Updates state with new events fetched
            setAllEvents(eventData);
  
            console.log('Successfully fetched events from admincalendar route');
          } else {
            console.error('Failed to fetch events from admincalendar route');
          }
        } catch (error) {
          console.error('Error fetching events from admincalendar route', error);
        }
      };
  
      fetchEvents();
    }, [selectedEvent]); // Updates the status of any selected events booked
  
   
    const handleBookEvent = async () => {
      try {
        // Include eventId in bookEvent object for tracking
        const updatedBookEvent = { ...bookEvent, eventId: selectedEvent._id };
    
        // Make POST request to backend
        const response = await fetch('http://localhost:3000/calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBookEvent),
        });
    
        if (response.ok) {
          setVenmoModalVisible(true);
    
          // Parse the response JSON
          const { bookedSlots, availableSlots } = await response.json();
    
          // Update event status on the frontend based on the existing events
          setAllEvents((prevEvents) => [
            ...prevEvents,
            { ...selectedEvent, bookedSlots, availableSlots },
          ]);
    
          // Clear the form fields after adding an event
          setBookEvent({ title: '', start: '', end: '', availableSlots: '0', bookedSlots: 0 });
        
          // Close the event details modal
           handleCloseModal();

      // Show the Venmo modal
      setVenmoModalVisible(true);
     } else {
      console.error('Failed to book event');
     }
    } catch (error) {
      console.error('Error booking event', error);
    }
  };

     const handleEventClick = (event) => {
      setSelectedEvent(event);
    };
  
    const handleCloseModal = () => {
      setSelectedEvent(null);
    };

    const handleCloseVenmoModal = () => {
      setVenmoModalVisible(false);
    };  
  
    return (
    <div>
    <h1>Playdates Calendar</h1>
    <style>{`
    
        .custom-event.available {
          background-color: purple; /* Change to the desired color for available events */
        }

        .custom-event.fully-booked {
          background-color: grey; /* Change to the desired color for fully booked events */
        }
      `}</style>
   
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        onSelectEvent={(event) => handleEventClick(event)}
        eventPropGetter={(event, start, end, isSelected) => {
          const availableSlots = event.availableSlots || 0;
          const bookedSlots = event.bookedSlots || 0;
          const remainingSlots = availableSlots - bookedSlots;

          return {
            className: `custom-event ${remainingSlots === 0 ? 'fully-booked' : 'available'}`,
          };
        }}
      />

      <Modal
        open={!!selectedEvent}
        title={selectedEvent?.title}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="signup"
            type="primary"
            onClick={handleBookEvent}
            disabled={selectedEvent ? selectedEvent.availableSlots - selectedEvent.bookedSlots === 0 : true}
          >
            Sign Up
          </Button>,
        ]}
      >
    <p>
    Start Time: {selectedEvent ? new Date(selectedEvent.start).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''}
  </p>
  <p>
    End Time: {selectedEvent ? new Date(selectedEvent.end).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''}
  </p>
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
      </Modal>
    </div>
  );
}

export default PlaydatesUserCalendar;