/* eslint-disable react/prop-types */
import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const ReminderCard = ({ eventTitle, eventTime, eventDate, eventId }) => {

    const navigate = useNavigate();

    const handleJoin = () => {
        navigate("/join-event", {
            state: {
                title: eventTitle,
                date: eventDate,
                time: eventTime,
                eventid : eventId,
            }
        });
    };

    const truncateText = (text, maxLength = 12) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    // Extract the day and month name from the full date (YYYY-MM-DD)
    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' }); // Extract short month name (e.g., "Feb")
        return { day, month };
    };

    const { day, month } = getFormattedDate(eventDate);

    return (
        <div className='bg-gray-300 text-black p-4 md:p-3 mb-5 rounded-2xl h-16 md:h-15 w-full flex items-center justify-between shadow-md gap-3'>


            <div className="flex flex-col items-center justify-center text-3xl font-semibold text-gray-700 leading-none">
                <span>{day}</span>
                <p className="text-[12px] text-gray-600 uppercase">{month}</p>
            </div>

            {/* Event Details */}
            <div className="flex flex-col text-left">
                <span className="text-[12px] text-gray-800">
                    {truncateText(eventTitle)}
                </span>
                <span className="text-[9px] text-gray-600">{eventTime}</span>
            </div>

            {/* Join Button */}
            <Button
                onClick={handleJoin}
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
