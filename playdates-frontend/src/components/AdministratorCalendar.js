// https://www.youtube.com/watch?v=lyRP_D0qCfk

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Modal, Button } from 'antd';

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format, 
  parse, 
  startOfWeek,
  getDay,
  locales
})

const events = [];

function PlaydatesAdministratorCalendar() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", availableSlots: "0" });
  const [allEvents, setAllEvents] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editMode, setEditMode] = useState(false); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Make a GET request to fetch events created already
        const response = await fetch("http://localhost:3000/admincalendar", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Parse response data in JSON format
          const eventData = await response.json();

          // Updates state with new events fetched 
          setAllEvents(eventData);

          console.log("Successfully fetched events from admincalendar route");
        } else {
          console.error("Failed to fetch events from admincalendar route");
        }
      } catch (error) {
        console.error("Error fetching events from admincalendar route", error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array makes effect run only once on mount


  const handleAddEvent = async () => {
    try {
      // Make POST request to backend
      const response = await fetch('http://localhost:3000/admincalendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
  
      if (response.ok) {
        console.log('Event added successfully');
  
        // Update events on the frontend
        const savedEvent = await response.json(); // Parse the response JSON
        setAllEvents([...allEvents, savedEvent]);
  
        // Clear the form fields after adding an event
        setNewEvent({ title: "", start: "", end: "", availableSlots: 0 });
      } else {
        console.error('Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event', error);
    }
  };
  
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setEditMode(false); // Reset edit mode
  };

  const handleEditEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admincalendar/${selectedEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEvent),
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        setAllEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
        );
        handleCloseModal(); // Close the modal after editing
      } else {
        console.error('Failed to edit event');
      }
    } catch (error) {
      console.error('Error editing event', error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admincalendar/${selectedEvent._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAllEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== selectedEvent._id)
        );
        handleCloseModal(); // Close the modal after deleting
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };


  return (
    <div>
      <h1>Playdates Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          id="eventTitle" 
          name="eventTitle" 
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <div>
          <span>Start Date (Eastern Time): </span>
          <DatePicker
            placeholderText="Start Date"
            id="startDate"
            name="startDate"
            style={{ marginRight: "10px" }}
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <div>
          <span>End Date (Eastern Time): </span>
          <DatePicker
            placeholderText="End Date"
            id="endDate"
            name="endDate"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <div>
          <span>Spots Available: </span>
          <input
            type="number" min="1" // makes sure 1 is the minimum number
            id="slotsAvailable"
            name="slotsAvailable"
            placeholder=""
            style={{ width: "20%", marginRight: "10px" }}
            value={newEvent.slotsAvailable}
            onChange={(e) => setNewEvent({ ...newEvent, availableSlots: Math.max(1, e.target.value) })}
          />
          <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={handleEventClick}
        eventPropGetter={(event, start, end, isSelected) => {
          return {
            className: `custom-event`,
            style: {
              background: '#3174ad', 
            },
          };
        }}
      />
    <Modal
      open={!!selectedEvent}
      title={selectedEvent?.title}
      onCancel={handleCloseModal}
      footer={[
        <Button key="edit" type="primary" onClick={() => setEditMode(true)}>
          {editMode ? 'Save' : 'Edit'}
        </Button>,
        <Button key="delete" type="danger" onClick={editMode ? handleDeleteEvent : handleCloseModal}>
          {editMode ? 'Delete' : 'Close'}
        </Button>,
      ]}
    >
      <p>Spots Available: {selectedEvent?.availableSlots}</p>
    </Modal>
    </div>
);
}

export default PlaydatesAdministratorCalendar;

