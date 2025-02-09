import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import Map from '../../components/Map';
import animationGif from '../../assets/animation/animation.gif';
import userIcon from '../../assets/svg/User.svg';
import { FaStar } from "react-icons/fa";
import "../ShareRide/ShareRide.css";

const ShareRide = () => {

  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');

  return (
    <div className="h-screen w-full">
      <SearchBar />
      {/* Main Content */}
      <div className="h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl md:shadow-2xl ml-auto">
        {/* Main Layout */}
        <div className="flex flex-col md:flex-row h-full p-3 md:p-7 gap-4 md:gap-4">

          <div className="w-full md:w-[50%] flex flex-col gap-3 md:gap-5">
            {/* Map Section - Ensuring Visibility on Mobile */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg h-[40vh] flex-grow ">
              <Map />
            </div>

            <div className="w-full md:max-h-52 flex flex-row gap-3 md:gap-5">
              {/* Expanded Chat Box */}
              <div className="bg-white text-black rounded-xl md:rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center text-center flex-[2] md:w-2/3">
                <p className="text-2xl font-medium font-sans text-black">Contact Your Partner</p>
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
              <div className="bg-white text-black rounded-xl md:rounded-2xl shadow-lg p-4 flex flex-col justify-center text-center flex-[1] md:w-1/3">
                <p className="text-2xl font-medium font-sans text-black">Ongoing</p>
                <p className='m-6 text-6xl'>67<span className='text-base'>KM</span></p>
              </div>
            </div>
          </div>



          {/* Right Section */}
          <div className="w-full md:w-[50%] flex flex-col gap-3 md:gap-5">
            {/* Pickup - section */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center">
              <p className="text-2xl font-medium font-sans text-black">Choose Ride</p>
              <div className="flex my-3 md:my-6 items-center">
                <div className="flex flex-col gap-4 justify-center">
                  <p className="text-sm font-sans  primary-color">Pickup</p>
                  <p className="text-sm font-sans  yellow-color">Event</p>
                </div>
                <div className=" w-[200px] flex flex-col gap-3 justify-center ">
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={location1}
                    onChange={(e) => setLocation1(e.target.value)}
                    className="text-base md:text-base text-black text-center outline-none"
                  />
                  <hr className=" md:w-[200px]" />
                  <input
                    type="text"
                    placeholder="Drop Location"
                    value={location2}
                    onChange={(e) => setLocation2(e.target.value)}
                    className="text-base md:text-base text-black text-center outline-none "
                  />
                </div>
              </div>
              <div className='flex mt-4 md:mt-auto gap-3'>
                <Button className="bg-green-600 md:w-[150px] font-sans text-white px-4 py-2 text-base md:text-lg rounded-3xl">Find Ride</Button>
                <Button className="bg-blue-500 md:w-[150px] font-sans text-white px-4 py-2 text-base md:text-lg rounded-3xl">Offer Ride</Button>
              </div>
            </div>

            {/* Pool Matching - section */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center w-full max-w-3xl mx-auto h-full">
              <p className="text-2xl font-sans font-medium text-black mb-12">Pool Matching</p>
              <div className="flex flex-col desktop-flex-row gap-6 items-center">

                {/* Left - Animation GIF */}
                <div className=" flex items-center justify-center">
                  <img src={animationGif} alt="animation" className="w-[300px] h-full " />
                </div>

                {/* Right - User Request Card */} 
                <div className="bg-gray-100 rounded-2xl shadow-md p-4 flex flex-col w-full items-center justify-center">
                  <div className="flex items-center gap-4 mb-2">
                    <img src={userIcon} alt="user" className="w-10 h-10 object-contain" />
                    <div>
                      <p className="text-lg font-medium text-gray-800">Michael Smith</p>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar />
                        <span className="text-sm font-medium text-gray-700">4.3</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Request Ride With You?</p>
                  <div className="flex gap-3">
                    <Button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-gray-400">
                      Accept
                    </Button>
                    <Button className="bg-gray-500 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-gray-400">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareRide
