/* eslint-disable react/prop-types */
import React from 'react';
import Button from './Button';

const ReminderCard = ({ eventTitle = "Blood Donation" }) => {
  
  // Function to truncate text if it exceeds 12 characters
  const truncateText = (text, maxLength = 12) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className='bg-gray-300 text-black p-4 md:p-3 rounded-2xl h-16 md:h-15 w-full flex items-center justify-between shadow-md gap-3'>
      
      {/* Date Section */}
      <div className="flex flex-col text-left text-3xl font-semibold text-gray-700">
        12
      </div>

      {/* Event Details */}
      <div className="flex flex-col text-left">
        <span className="text-[12px] text-gray-800">
          {truncateText(eventTitle)}
        </span>
        <span className="text-[9px] text-gray-600">07.30 am - 12.30pm</span>
      </div>

      {/* Join Button */}
      <Button 
        color="bg-green-500" 
        className="rounded-lg text-white shadow-sm" 
        customSize="py-1 px-4 text-xs"
        hoverEffect="hover:bg-green-600"
      >
        Join
      </Button>
      
    </div>
  );
};

export default ReminderCard;
