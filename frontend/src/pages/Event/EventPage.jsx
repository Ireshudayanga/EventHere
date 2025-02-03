// EventPage.jsx
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import '../Event/Event.css';
import { Link } from 'react-router-dom';
import ArrowFW  from '../../assets/svg/Arrow.svg';

const EventPage = () => {

    const categoryColors = {
        entertainment: "bg-green-500 text-white",
        volunteer: "bg-yellow-400 text-white",
        "traditional": "bg-blue-600 text-white",
    };


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
            <div className="md:bg-[#d4d3d3] h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl md:shadow-2xl ml-auto">
                {/* Main Layout */}
                <div className="flex flex-col md:flex-row h-full p-4 md:p-7 gap-4 md:gap-0">
                    {/* Left Section - Stack on mobile */}
                    <div className="w-full md:w-[25%] h-auto md:h-full flex flex-col gap-3 md:gap-5">
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
                        <div className="bg-white text-black p-4 md:p-5 rounded-xl md:rounded-2xl h-64 md:h-[65%] shadow-lg">
                            <div className="flex flex-col items-start h-full">
                                {/* Flex container for the title and link */}
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-2xl font-normal font-sans  px-3 py-1 rounded-md">
                                        Events
                                    </p>
                                    <Link to="/events" className="text-blue-500  px-3 py-1 rounded-md">
                                       <div className="flex items-center gap-1">
                                             <p>See all</p>    
                                             <img className='w-3 ' src={ArrowFW} alt="Arrow" />
                                       </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Section - Full width on mobile */}
                    <div className="w-full md:w-[75%] h-full text-zinc-950 flex flex-col md:pl-6">
                        <div className="h-[60vh] md:h-2/3 overflow-y-auto">
                            <div className="bg-white text-black p-4 md:p-5 rounded-xl md:rounded-2xl h-full shadow-lg">
                                {/* Content shortened for example */}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit...
                            </div>
                        </div>
                        {/* Cards Stack on mobile */}
                        <div className="flex flex-col md:flex-row gap-3 justify-between pt-4 md:pt-5 h-auto md:h-1/3">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-white text-black rounded-xl md:rounded-2xl w-full md:w-1/3 h-32 md:h-full p-3 md:p-4 shadow-lg">
                                    Lorem ipsum dolor sit amet consectetur...
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPage;