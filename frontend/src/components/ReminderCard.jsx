/* eslint-disable react/prop-types */
import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';

const ReminderCard = ({
    event,
    eventTitle,
    eventTime,
    eventDate,
    eventId,
    mode = "join", 
    onDelete, 
}) => {
    const navigate = useNavigate();

    const handleJoin = () => {
        navigate("/join-event", {
            state: {
                title: eventTitle,
                date: eventDate,
                time: eventTime,
                eventid: eventId,
            },
        });
    };

    const handleEdit = () => {
        navigate("/edit-event", {
            state: {
             ...event, // send the whole event object (recommended)
            },
          });
          
    };

    const truncateText = (text, maxLength = 16) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        return { day, month };
    };

    const { day, month } = getFormattedDate(eventDate);

    return (
        <div className="bg-gray-300 text-black p-4 md:p-3 mb-5 rounded-2xl h-16 md:h-15 w-full flex items-center justify-between shadow-md gap-3">
            <div className="flex flex-col items-center justify-center text-3xl font-semibold text-gray-700 leading-none">
                <span>{day}</span>
                <p className="text-[12px] text-gray-600 uppercase">{month}</p>
            </div>

            <div className="flex flex-col text-left">
                <span className="text-[12px] text-gray-800">
                    {truncateText(eventTitle)}
                </span>
                <span className="text-[9px] text-gray-600">{eventTime}</span>
            </div>

            {/* Button(s) depending on mode */}
            {mode === "edit" ? (
                <div className="flex gap-1">
                    <Button
                        onClick={handleEdit}
                        color="bg-blue-500"
                        className="rounded-lg text-white shadow-sm"
                        customSize="p-2"
                        hoverEffect="hover:bg-blue-600"
                    >
                        <Pencil size={16} />
                    </Button>
                    <Button
                        onClick={() => onDelete?.(eventId)}
                        color="bg-red-500"
                        className="rounded-lg text-white shadow-sm"
                        customSize="p-2"
                        hoverEffect="hover:bg-red-600"
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            ) : (
                <Button
                    onClick={handleJoin}
                    color="bg-green-500"
                    className="rounded-lg text-white shadow-sm"
                    customSize="py-1 px-4 text-xs"
                    hoverEffect="hover:bg-green-600"
                >
                    Join
                </Button>
            )}
        </div>
    );
};

export default ReminderCard;
