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

  const tileClassName = ({ date }) => {
    if (!Array.isArray(events) || events.length === 0) return null;

  
    const tileDate = new Date(date);
    tileDate.setHours(0, 0, 0, 0);

    const eventForTile = events.find((event) => {
        if (!event.date) return false;

        // Convert event date to local midnight time
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0); // Normalize to avoid time zone shifts

        return eventDate.getTime() === tileDate.getTime();
    });

    if (eventForTile) {
        return `${categoryColors[eventForTile.category] || 'bg-purple-600 text-white'} rounded-full px-2`;
    }
    return null;
};



  const handleDateChange = (selectedDate) => {
    setDate(selectedDate); // This calls handleDateChange in EventPage
};

  return (
    <div className="calendar-container ">
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={tileClassName}
        view="month"
        maxDetail="month"
        className={`${className} rounded-xl md:rounded-2xl `}
      />
    </div>
  );
};

export default CustomCalendar;
