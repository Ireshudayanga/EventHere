import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import '../Event/Event.css';
import { Link } from 'react-router-dom';
import ArrowFW from '../../assets/svg/Arrow.svg';
import Calender from '../../utils/Calender';
import Button from '../../components/Button';
import ReminderCard from '../../components/ReminderCard';
import Map from '../../components/Map';

const EventPage = () => {

    const categoryColors = {
        entertainment: "bg-green-500 text-white",
        volunteer: "bg-yellow-400 text-white",
        traditional: "bg-blue-600 text-white",
        All: "bg-gray-500 text-white p-6",
    };

    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);

    const [date, setDate] = useState(new Date());
    const [calenderEvents, setCalenderEvents] = useState([]);

    useEffect(() => {
        fetch("/event.json")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const uniqueCategories = [
                        "All",
                        ...new Set(data.map((event) => event.category)),
                    ];
                    setCategories(uniqueCategories);
                    setEvents(data);
                    setCalenderEvents(data);
                   
                } else {
                    console.error("Invalid data format: Expected an array");
                }
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);


    return (
        <div className="h-screen w-full">
            <SearchBar />
            {/* Main Content */}
            <div className="h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl md:shadow-2xl ml-auto">
                {/* Main Layout */}
                <div className="flex flex-col md:flex-row h-full p-3 md:p-7 gap-4 md:gap-0">

                    {/* Left Section */}
                    <div className="w-full md:w-[35%] flex flex-col gap-3 md:gap-5">

                        {/* Upcoming Section */}
                        <div className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow-lg">
                            <p className="text-2xl text-black font-medium  font-sans">Upcoming ...</p>
                            <div className="flex gap-3 flex-wrap mt-4">
                                {categories.length > 0 ? (
                                    categories.map((category, index) => (
                                        <button
                                            key={index}
                                            className={`px-4 py-2 rounded-full text-sm ${categoryColors[category] || "text-black"}`}
                                        >
                                            {category}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No categories available</p>
                                )}
                            </div>
                        </div>

                        {/* Events Section */}
                        <div className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow-lg  md:h-[75%] lg:h-[80%] xl:h-[85%]">
                            <div className="flex justify-between items-center w-full">
                                <div>
                                    <p className="text-2xl font-medium text-black  font-sans">Events</p>
                                    <p className="text-[12px] text-black ">Join our community</p>
                                </div>
                                <Link to="/events" className="text-blue-500">
                                    <div className="flex items-center gap-1">
                                        <p>See all</p>
                                        <img className='w-3' src={ArrowFW} alt="Arrow" />
                                    </div>
                                </Link>
                            </div>
                            <div className="mt-4 overflow-y-auto md:overflow-y-scroll custom-scrollbar h-[calc(100vh-250px)] md:h-[calc(100vh-390px)] xl:h-[calc(100vh-350px)]">
                            <Calender date={date} events={calenderEvents} setDate={setDate} />

                            </div>

                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-[65%] flex flex-col gap-4 md:pl-6">
                        {/* Map Section */}
                        <div className="h-[50vh] md:h-2/3">
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg h-full  map-container">
                                <Map clickable={false}/>
                            </div>
                        </div>

                        {/* Bottom Card Section */}
                        <div className="flex flex-col md:flex-row gap-3 md:gap-4">

                            {/* Share Ride */}
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center text-center h-full">
                                <p className="text-2xl font-medium text-black">Share Ride</p>
                                <p className="text-[12px] text-black">Choose event for ride</p>
                                <div className="flex gap-2 my-3">
                                    <Button color="bg-blue-600" className="px-4 py-2 rounded-full text-sm text-white">
                                        Share
                                    </Button>
                                    <Button color="bg-green-500" className="px-4 py-2 rounded-full text-sm text-white">
                                        Offer
                                    </Button>
                                </div>
                                {/* Centered Text */}
                                <p className="text-[9px] text-black w-full">Please be aware about user ratings</p>
                            </div>



                            {/* Volunteer Section */}
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 w-full md:w-[40%]">
                                <p className="text-[22px] font-medium text-center text-black ">Become a Volunteer</p>
                                <div className="mt-3 overflow-y-auto custom-scrollbar max-h-40">
                                    {events.length > 0 ? events
                                        .filter(event => event.category === 'volunteer')
                                        .map((event, index) => (
                                            <ReminderCard
                                                key={index}
                                                eventTitle={event.title}
                                                eventTime={event.time}
                                                eventDate={event.date}
                                            />
                                        )) : (
                                        <p className="text-gray-500 text-sm">No events available</p>
                                    )}
                                </div>
                            </div>

                            {/* Ask Administration */}
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-5 w-full md:w-[30%]">
                                <p className="text-2xl font-medium text-center text-black ">Ask Administration</p>
                                <div className="relative w-full mt-3">
                                    <textarea
                                        className="w-full h-28 bg-gray-200 rounded-lg p-3 text-gray-700 text-sm outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                                        placeholder="Enter Your Message .."
                                    ></textarea>
                                    <Button className="absolute bottom-3 right-2 px-4 py-1 text-white bg-blue-500 text-sm rounded-3xl">
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
