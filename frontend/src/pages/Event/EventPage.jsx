// EventPage.jsx
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import '../Event/Event.css';
import { Link } from 'react-router-dom';
import ArrowFW from '../../assets/svg/Arrow.svg';
import Calender from '../../utils/Calender';
import Button from '../../components/Button';
import ReminderCard from '../../components/ReminderCard';
import profileImage from '../../assets/svg/User.svg'
import Map from '../../components/Map';

const EventPage = () => {

    const categoryColors = {
        entertainment: "bg-green-500 text-white",
        volunteer: "bg-yellow-400 text-white",
        traditional: "bg-blue-600 text-white",
    };

    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("/event.json")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const uniqueCategories = [
                        ...new Set(data.map((event) => event.category)),
                    ];
                    setCategories(uniqueCategories);
                    setEvents(data);
                } else {
                    console.error("Invalid data format: Expected an array");
                }
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    return (
        <div className="h-screen">
            <SearchBar />
            {/* Main Content */}
            <div className="h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl md:shadow-2xl ml-auto">
                {/* Main Layout */}
                <div className="flex flex-col md:flex-row h-full p-4 md:p-7 gap-4 md:gap-0">

                    {/* Left Section - Stack on mobile */}
                    <div className="w-full md:w-[35%] h-auto md:h-full flex flex-col gap-3 md:gap-5">
                        {/* ------------------------- Left Section - Upcoming -------------------------- */}
                        <div className="bg-white text-black p-4 md:p-5 rounded-xl md:rounded-2xl h-48 md:h-[35%] shadow-lg">
                            <div className="flex flex-col items-start">
                                <p className="text-2xl font-norma font-sans">Upcoming ...</p>
                                <div className="flex gap-3 flex-wrap mt-5">
                                    {categories.length > 0 ? (
                                        categories.map((category, index) => (
                                            <button
                                                key={index}
                                                className={`px-4 py-2 rounded-full text-sm  ${categoryColors[category] || " text-black"
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No categories available</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ------------------------- Left Section - events -------------------------- */}
                        <div className="bg-white text-black p-4 md:p-5 rounded-xl md:rounded-2xl h-64 md:h-[65%] shadow-lg">
                            <div className="flex flex-col items-start h-full">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex flex-col items-start"> {/* Ensure text alignment */}
                                        <p className="text-2xl font-normal font-sans px-3 py-1 rounded-md">
                                            Events
                                        </p>
                                        <p className="text-[12px] px-3">Join our community</p>
                                    </div>
                                    <Link to="/events" className="text-blue-500 px-3 py-1 rounded-md">
                                        <div className="flex items-center gap-1">
                                            <p>See all</p>
                                            <img className='w-3' src={ArrowFW} alt="Arrow" />
                                        </div>
                                    </Link>
                                </div>
                                <div className='px-3 mt-5 overflow-y-scroll custom-scrollbar rounded-md pr-2 max-h-56'>
                                    <Calender />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Full width on mobile */}
                    <div className="w-full md:w-[65%] h-full text-zinc-950 flex flex-col md:pl-6">
                        <div className="h-[50vh] md:h-2/3 overflow-y-auto">
                            <div className="bg-white text-black  rounded-xl md:rounded-2xl h-full shadow-lg">
                               <Map/>
                            </div>
                        </div>
                        {/* Cards Stack on mobile */}
                        <div className="flex flex-col md:flex-row gap-3 justify-between pt-4 md:pt-5 h-auto md:h-[38%]">

                            {/* First Box */}
                            <div className="bg-white text-black rounded-xl md:rounded-2xl w-full md:w-[30%] h-32 md:h-full p-3 md:p-4 shadow-lg flex flex-col items-center justify-center">
                                <div className='text-2xl font-norma font-sans'>Share Ride </div>
                                <div className='text-[12px] font-sans'>Choose event for ride</div>
                                <div className='flex gap-2 my-3'>
                                    <Button color='bg-blue-600' className='px-4 py-2 rounded-full text-sm text-white' hoverEffect="hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"
                                    >Share</Button>
                                    <Button color='bg-green-500' className='px-4 py-2 rounded-full text-sm text-white' hoverEffect="hover:bg-gradient-to-r hover:from-green-500 hover:to-green-300"
                                    >Offer</Button>
                                </div>
                                <div className='text-[9px] font-sans'>Please be aware about user ratings</div>
                            </div>

                            {/* Become a Volunteer - Render from Events */}
                            <div className="bg-white text-black rounded-xl md:rounded-2xl w-full md:w-[40%] h-32 md:h-full p-3 md:p-4 shadow-lg flex flex-col items-center justify-center">
                                <div className='text-2xl font-norma font-sans'>Become a Volunteer</div>
                                <div className="mt-3 overflow-y-scroll custom-scrollbar rounded-md pr-2 max-h-40">
                                    {events.length > 0 ? events.filter(event => event.category === 'volunteer').map((event, index) => (
                                        <ReminderCard
                                            key={index}
                                            eventTitle={event.title}
                                            eventTime={event.time}
                                            eventDate={event.date}
                                        />
                                    ))
                                        : (
                                            <p className="text-gray-500 text-sm">No events available</p>
                                        )}
                                </div>

                            </div>

                            {/* Third Box - Ask Administration */}
                            <div className="bg-white text-black rounded-xl md:rounded-2xl w-full md:w-[30%] h-48 md:h-full p-5 md:p-6 shadow-lg flex flex-col items-center justify-center">
                                <p className="text-lg font-sans text-center">Ask Administration</p>

                                {/* Text Area Container with Send Button */}
                                <div className="relative w-full mt-3">
                                    <textarea
                                        className="w-full h-28 bg-gray-200 rounded-lg p-3 text-gray-700 text-sm outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                                        placeholder="Enter Your Message .."
                                    ></textarea>

                                    {/* Send Button - Positioned Bottom Right */}
                                    <Button customSize='sm' className="absolute bottom-3 rounded-3xl right-2 px-4 py-1 text-white bg-blue-500 text-sm hover:bg-blue-600 transition">
                                        Send
                                    </Button>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventPage;