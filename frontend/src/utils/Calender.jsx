/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../utils/Calender.css';

const CustomCalendar = ({
  className,
  setDate,
  date,
  events,
}) => {

  const categoryColors = {
    entertainment: 'bg-green-500 text-white',
    volunteer: 'bg-yellow-400 text-white',
    traditional: 'bg-blue-600 text-white',
  };

  // Function to determine tile class based on events
  const tileClassName = ({ date }) => {
    if (!Array.isArray(events) || events.length === 0) return null; // Ensure events is a valid array
  
    const event = events.find((event) => 
      event.date && new Date(event.date).toDateString() === date.toDateString()
    );
  
    if (event) {
      return `${categoryColors[event.category] || 'bg-gray-400 text-white'} rounded-full px-2`;
    }
    return null;
  };
  // Function to handle date selection
  const handleDateChange = (selectedDate) => {
    // console.log("Selected Date from Calender components:", selectedDate.toDateString()); // Log selected date
    setDate(selectedDate); // Update the state
  };

  return (
    <div className="calendar-container ">
      <Calendar
        onChange={handleDateChange} // Trigger console log when date is selected
        value={date}
        tileClassName={tileClassName}
        view="month"
        maxDetail="month"
        className={`${className} rounded-xl md:rounded-2xl shadow-lg`}
      />
    </div>
  );
};

export default CustomCalendar;
