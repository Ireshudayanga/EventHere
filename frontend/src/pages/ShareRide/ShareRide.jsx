import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import '../Event/Event.css';
import { Link } from 'react-router-dom';
import ArrowFW from '../../assets/svg/Arrow.svg';
import Calender from '../../utils/Calender';
import Button from '../../components/Button';
import ReminderCard from '../../components/ReminderCard';
import Map from '../../components/Map';

const ShareRide = () => {
  return (
    <div className="h-screen w-full">
      <SearchBar />
      {/* Main Content */}
      <div className="h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl md:shadow-2xl ml-auto">
        {/* Main Layout */}
        <div className="flex flex-col md:flex-row h-full p-3 md:p-7 gap-4 md:gap-0">

        <div className="w-full md:w-[50%] flex flex-col gap-3 md:gap-5">
  {/* Map Section - Ensuring Visibility on Mobile */}
  <div className="bg-white rounded-xl md:rounded-2xl shadow-lg h-[40vh] flex-grow ">
    <Map />
  </div>

  <div className="w-full md:max-h-52 flex flex-row gap-3 md:gap-5">
    {/* Expanded Chat Box */}
    <div className="bg-white text-black rounded-xl md:rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center text-center flex-[2] md:w-2/3">
      <p className="text-2xl font-medium text-black">Contact Your Partner</p>
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

    {/* Ongoing Status */}
    <div className="bg-white text-black rounded-xl md:rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center text-center flex-[1] md:w-1/3">
      <p className="text-2xl font-medium text-black">Ongoing</p>
      <p className='m-6 text-6xl'>67<span className='text-base'>KM</span></p>
    </div>
  </div>
</div>



          {/* Right Section */}
          {/* 
           
           
           */}

        </div>
      </div>
    </div>
  )
}

export default ShareRide
