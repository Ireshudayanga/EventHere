import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../../redux/eventSlice';
import { fetchSpecialCategory } from '../../../redux/specialCategorySlice';
import { ClipLoader } from "react-spinners";
import SearchBar from '../../components/SearchBar';
import '../Event/Event.css';
import { Link } from 'react-router-dom';
import ArrowFW from '../../assets/svg/Arrow.svg';
import Calender from '../../utils/Calender';
import Button from '../../components/Button';
import ReminderCard from '../../components/ReminderCard';
import ShowEventMap from '../../components/mapType/ShowEventMap';
import { IoMdClose } from "react-icons/io";
import { BsChatDotsFill } from 'react-icons/bs'; // ⬅️ add this at top with other imports
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useSocket } from "../../socket/SocketPrivider";




const EventPage = () => {
    const dispatch = useDispatch();
    const { socket } = useSocket();
    const { events, status, error } = useSelector((state) => state.events);
    const { category: specialCategory, status: categoryStatus } = useSelector(
        (state) => state.specialCategory
    );

    const [selectedDate, setSelectedDate] = useState(null);
    const [showChat, setShowChat] = useState(false);

    const [message, setMessage] = useState("");
    const { currentUser } = useContext(AuthContext);

   
    const handleSendMessage = () => {
        if (!message.trim()) {
          toast.warning("Message is empty");
          return;
        }
      
        const data = {
          name: currentUser?.displayName || "Anonymous",
          email: currentUser?.email || "unknown@email.com",
          message: message.trim(),
        };
      
        // ✅ Only emit through socket
        socket.current.emit("admin-message", data);
      
        toast.success("Message sent to admin");
        setMessage("");
        setShowChat(false);
      };
      



    const categoryColors = {
        entertainment: "bg-green-500 text-white",
        volunteer: "bg-yellow-400 text-white",
        traditional: "bg-blue-600 text-white",
        All: "bg-gray-500 text-white p-6",
    };

    const [categories, setCategories] = useState([]);
    const [calenderEvents, setCalenderEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        setSelectedCategory('');
    };

    const HandleCategoryFilter = (e) => {
        const category = e.target.innerText;
        setSelectedCategory(category === "All" ? "" : category);
        setSelectedDate(null);
    };

    useEffect(() => {
        dispatch(fetchEvents());
        dispatch(fetchSpecialCategory());
    }, [dispatch]);

    useEffect(() => {
        if (status === "succeeded" && categoryStatus === "succeeded") {
            setCalenderEvents(events);
            const uniqueCategories = [
                "All",
                "volunteer",
                "traditional",
                "entertainment",
                ...(specialCategory ? [specialCategory] : []),
            ];
            setCategories(uniqueCategories);
        }
    }, [status, categoryStatus, events, specialCategory]);

    return (
        <div className="w-full relative">
            <SearchBar />

            <div className="h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl ml-auto">
                <div className="flex flex-col md:flex-row h-full p-3 md:p-7 gap-4 md:gap-0">
                    {/* Left Panel */}
                    <div className="w-full md:w-[35%] flex flex-col gap-3 md:gap-5">
                        <div className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow-lg">
                            <p className="text-2xl text-black font-medium font-sans">Upcoming ...</p>
                            <div className="flex gap-3 flex-wrap mt-4">
                                {categoryStatus === "loading" ? (
                                    <div className="flex justify-center items-center">
                                        <ClipLoader size={40} color={"#3498db"} loading={true} />
                                    </div>
                                ) : categoryStatus === "failed" ? (
                                    <p className="text-red-500 text-center text-sm">Error fetching special category: {error}</p>
                                ) : (
                                    categories.map((category, index) => {
                                        const isCategoryAll = category === "All";
                                        const isCategorySelected = isCategoryAll ? (selectedCategory === "") : (selectedCategory === category);
                                        const isSelected = isCategorySelected && !selectedDate;
                                        const categoryClass = categoryColors[category] || "bg-purple-600 text-white";
                                        return (
                                            <button
                                                onClick={HandleCategoryFilter}
                                                key={index}
                                                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 
                        ${isSelected ? `${categoryClass} font-bold shadow-lg` : "bg-gray-300 text-gray-500 opacity-50 hover:opacity-80"}`}
                                            >
                                                {category}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl md:rounded-2xl h-full">
                            <div className="flex px-5 pt-5 justify-between items-center w-full">
                                <div>
                                    <p className="text-2xl font-medium text-black font-sans">Events</p>
                                    <p className="text-[12px] text-black">Join our community</p>
                                </div>
                                <Link to="/events" className="text-blue-500">
                                    <div className="flex items-center gap-1">
                                        <p>See all</p>
                                        <img className='w-3' src={ArrowFW} alt="Arrow" />
                                    </div>
                                </Link>
                            </div>

                            <div className="mt-2 overflow-y-auto md:overflow-y-scroll custom-scrollbar">
                                {status === "loading" ? (
                                    <div className="flex justify-center items-center h-full">
                                        <ClipLoader size={50} color={"#3498db"} loading={true} />
                                    </div>
                                ) : status === "failed" ? (
                                    <p className="text-red-500 text-center text-sm">Error fetching events: {error}</p>
                                ) : (
                                    <Calender date={selectedDate} setDate={handleDateChange} events={calenderEvents} />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="w-full md:w-[65%] flex flex-col gap-4 md:pl-6">
                        <div className="h-[60vh] md:h-[75vh] flex-grow">
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg h-full">
                                <ShowEventMap
                                    filterDate={selectedDate}
                                    categoryType={selectedCategory}
                                    specialCategoryName={specialCategory}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            {/* 🚗 Share Ride */}
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-5 flex flex-col items-center justify-between text-center md:w-1/2 w-full min-h-[150px]">
                                <p className="text-lg font-semibold text-black">Share Ride</p>
                                <p className="text-xs text-gray-600">Want you Share or Offer Ride?</p>
                                <div className="flex gap-3">
                                    <Link to="/share-ride">
                                        <Button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">Share</Button>
                                    </Link>
                                    <Link to="/share-ride">
                                        <Button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">Offer</Button>
                                    </Link>
                                </div>
                            </div>

                            {/* 🤝 Become a Volunteer */}
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-5 flex flex-col justify-between md:w-1/2 w-full min-h-[200px] md:min-h-[150px]">
                                <p className="text-lg font-semibold text-center text-black">Become a Volunteer</p>
                                <div className="mt-2 overflow-y-auto custom-scrollbar max-h-[150px] md:max-h-[75px]">
                                    {status === "loading" ? (
                                        <div className="flex justify-center items-center">
                                            <ClipLoader size={40} color={"#3498db"} loading={true} />
                                        </div>
                                    ) : (
                                        (() => {
                                            const upcomingVolunteerEvents = events
                                                .filter((event) => {
                                                    const eventDate = new Date(event.date);
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0);
                                                    return event.category === 'volunteer' && eventDate >= today;
                                                })
                                                .sort((a, b) => new Date(a.date) - new Date(b.date));

                                            return upcomingVolunteerEvents.length > 0 ? (
                                                upcomingVolunteerEvents.map((event, index) => (
                                                    <ReminderCard
                                                        key={index}
                                                        eventTitle={event.title}
                                                        eventTime={event.time}
                                                        eventDate={event.date}
                                                        eventId={event._id}
                                                    />
                                                ))
                                            ) : (
                                                <p className="text-xs text-gray-500">No upcoming volunteer events.</p>
                                            );
                                        })()
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {/* 🧊 Floating Chat Popup */}
            <div className="fixed bottom-6 right-6 z-[1600]">
                {!showChat && (
                    <button
                        onClick={() => setShowChat(true)}
                        className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
                        title="Ask from Admin"
                    >
                        <BsChatDotsFill className="w-7 h-7" />
                    </button>
                )}

                {showChat && (
                    <div className="relative w-[340px] max-h-[400px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in-up">
                        {/* Header */}
                        <div className="flex justify-between items-center px-5 py-3 border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                            <h3 className="text-md font-semibold">Admin Support</h3>
                            <button onClick={() => setShowChat(false)} className="hover:text-gray-100 transition">
                                <IoMdClose className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-5 py-4">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full h-28 bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-700 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 outline-none resize-none transition-all"
                                placeholder="Write your message..."
                            ></textarea>
                        </div>

                        {/* Footer */}
                        <div className="px-5 pb-5 flex justify-end">
                            <Button
                                onClick={handleSendMessage}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-full transition-shadow shadow-md hover:shadow-lg"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                )}
            </div>





        </div>
    );
};

export default EventPage;
