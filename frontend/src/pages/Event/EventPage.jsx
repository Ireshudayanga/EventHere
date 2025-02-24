import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../../redux/eventSlice';
import { fetchSpecialCategory } from '../../../redux/specialCategorySlice';
import { ClipLoader } from "react-spinners"; // ✅ Import spinner
import SearchBar from '../../components/SearchBar';
import '../Event/Event.css';
import { Link } from 'react-router-dom';
import ArrowFW from '../../assets/svg/Arrow.svg';
import Calender from '../../utils/Calender';
import Button from '../../components/Button';
import ReminderCard from '../../components/ReminderCard';
import ShowEventMap from '../../components/mapType/ShowEventMap';

const EventPage = () => {
    const dispatch = useDispatch();
    const { events, status, error } = useSelector((state) => state.events);
    const { category: specialCategory, status: categoryStatus } = useSelector(
        (state) => state.specialCategory 
    );



    const categoryColors = {
        entertainment: "bg-green-500 text-white",
        volunteer: "bg-yellow-400 text-white",
        traditional: "bg-blue-600 text-white",
        All: "bg-gray-500 text-white p-6",
    };

    const [categories, setCategories] = useState([]);
    const [date, setDate] = useState(new Date());
    const [calenderEvents, setCalenderEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const HandleCategoryFilter = (e) => {
        const category = e.target.innerText;
        setSelectedCategory(category === "All" ? "" : category);
    };

    useEffect(() => {
        dispatch(fetchEvents());
        dispatch(fetchSpecialCategory());
    }, [dispatch]);

    useEffect(() => {
        if (status === "succeeded" && categoryStatus === "succeeded") {
            console.log(events);
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
        <div className="h-screen w-full">
            <SearchBar />
            <div className="h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl md:shadow-2xl ml-auto">
                <div className="flex flex-col md:flex-row h-full p-3 md:p-7 gap-4 md:gap-0">
                    <div className="w-full md:w-[35%] flex flex-col gap-3 md:gap-5">
                        <div className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow-lg">
                            <p className="text-2xl text-black font-medium font-sans">Upcoming ...</p>
                            <div className="flex gap-3 flex-wrap mt-4">
                                {categories.length > 0 ? (
                                    categories.map((category, index) => (
                                        <button
                                            onClick={HandleCategoryFilter}
                                            key={index}
                                            className={`px-4 py-2 rounded-full text-sm ${categoryColors[category] || "bg-purple-800 text-white"}`}
                                        >
                                            {category}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No categories available</p>
                                )}
                            </div>
                        </div>

                        {/* ✅ Show Loading Spinner Instead of "Loading events..." */}
                        <div className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow-lg md:h-[75%] lg:h-[80%] xl:h-[85%]">
                            <div className="flex justify-between items-center w-full">
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
                            <div className="mt-4 overflow-y-auto md:overflow-y-scroll custom-scrollbar h-[calc(100vh-250px)] md:h-[calc(100vh-390px)] xl:h-[calc(100vh-350px)]">
                                {status === "loading" ? (
                                    <div className="flex justify-center items-center h-full">
                                        <ClipLoader size={50} color={"#3498db"} loading={true} />
                                    </div>
                                ) : status === "failed" ? (
                                    <p className="text-red-500 text-sm">Error fetching events: {error}</p>
                                ) : (
                                    <Calender date={date} events={calenderEvents}  />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[65%] flex flex-col gap-4 md:pl-6">
                        <div className="h-[60vh] md:h-[75vh] flex-grow">
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg h-full">
                                <ShowEventMap categoryType={selectedCategory} />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-5 flex flex-col items-center justify-between text-center flex-1 min-h-[150px]">
                                <p className="text-lg font-semibold text-black">Share Ride</p>
                                <p className="text-xs text-gray-600">Choose event for ride</p>
                                <div className="flex gap-3">
                                    <Button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
                                        Share
                                    </Button>
                                    <Button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
                                        Offer
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-5 flex flex-col justify-between flex-2 min-h-[150px]">
                                <p className="text-lg font-semibold text-center text-black">Become a Volunteer</p>
                                <div className="mt-2 overflow-y-auto custom-scrollbar max-h-[75px]">
                                    {status === "loading" ? (
                                        <div className="flex justify-center items-center">
                                            <ClipLoader size={40} color={"#3498db"} loading={true} />
                                        </div>
                                    ) : (
                                        events
                                            .filter((event) => event.category === 'volunteer')
                                            .map((event, index) => (
                                                <ReminderCard
                                                    key={index}
                                                    eventTitle={event.title}
                                                    eventTime={event.time}
                                                    eventDate={event.date}
                                                />
                                            ))
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-5 flex flex-col justify-between flex-1 min-h-[150px]">
                                <p className="text-lg font-semibold text-center text-black">Ask from Admin</p>
                                <div className="relative flex-1">
                                    <textarea
                                        className="w-full h-full bg-gray-200 rounded-lg p-3 text-gray-700 text-sm outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                                        placeholder="Enter Your Message .."
                                    ></textarea>
                                    <Button className="absolute bottom-2 right-2 px-4 py-1 text-white bg-blue-500 text-sm rounded-3xl">
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
