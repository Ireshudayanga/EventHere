import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/event.json')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const categoryColors = {
    entertainment: 'bg-green-500 text-white',
    volunteer: 'bg-yellow-400 text-white',
    traditional: 'bg-blue-600 text-white',
  };

  // Function to determine tile class based on events
  const tileClassName = ({ date }) => {
    const event = events.find((event) => new Date(event.date).toDateString() === date.toDateString());
    if (event) {
      return `${categoryColors[event.category] || 'bg-gray-400 text-white'} rounded-full px-2`;
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
        view="month" // Only show the month view
        maxDetail="month" // Prevents navigation to Year or Decade views
      />
    </div>
  );
};

export default CustomCalendar;
