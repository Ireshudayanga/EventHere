import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import ShareRideMap from "../../components/mapType/ShareRideMap";
import RideCard from "./RideCard";
import animationGif from "../../assets/animation/animation.gif";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../redux/eventSlice";
import { fetchSpecialCategory } from "../../../redux/specialCategorySlice";
import "../ShareRide/ShareRide.css";
import { AuthContext } from "../../context/AuthProvider";
import { addRide } from "../../../redux/rideShareSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";
import Lottie from "lottie-react";
import rideAnimation from "../../assets/animation/LottyLoadingHand.json";
import WalkingManAnimation from "../../assets/animation/WalkingManAnimation.json"

const ShareRide = () => {
  const { currentUser } = useContext(AuthContext);

  // Pickup and Drop location states
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");

  // Tracks active input field ("pickup" or "event")
  const [activeField, setActiveField] = useState(null);

  // Controls ride selection visibility
  const [showRideSelection, setShowRideSelection] = useState(true);

  // Ride status
  const [isRequesting, setIsRequesting] = useState(false);
  const [availableRides, setAvailableRides] = useState(false); // Initially false

  const dispatch = useDispatch();

  // Fetch events and categories on component mount
  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchSpecialCategory());
  }, [dispatch]);

  // Handle ride request/offer
  const handleConfirmRide = async (type) => {
    if (!location1 || !location2) {
      alert("Please select both Pickup and Event locations.");
      return;
    }

    setShowRideSelection(false); // Hide ride selection
    setIsRequesting(true); // Show loading animation

    // Simulate ride search delay
    setTimeout(() => {
      setAvailableRides(true); // Show ride results
      setIsRequesting(false); // Hide loading animation
    }, 3000);
  };

  return (
    <div className="h-screen w-full">
      <ToastContainer />
      <SearchBar />
      <div className="h-full w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl md:shadow-2xl ml-auto">
        <div className="flex flex-col md:flex-row h-full p-3 md:p-7 gap-4 md:gap-5">

          {/* Left Side - Map and Communication */}
          <div className="w-full md:w-[50%] flex flex-col gap-3">
            {/* Map Section */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg h-[40vh] flex-grow">
              <ShareRideMap
                onPickupSelect={setLocation1}
                onDropSelect={setLocation2}
                activeField={activeField}
                pickupLocation={location1}
                dropLocation={location2}
              />
            </div>

            {/* Communication & Ride Status Section */}
            <div className="w-full md:max-h-52 flex flex-row gap-3 md:gap-5">
              {/* Chat Box */}
              <div className="bg-white text-black rounded-xl md:rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center text-center flex-[2] md:w-2/3">
                <p className="text-2xl font-medium">Contact Your Partner</p>
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

              {/* Ongoing Ride Status */}
              <div className="bg-white text-black rounded-xl md:rounded-2xl shadow-lg p-4 flex flex-col justify-center text-center flex-[1] md:w-1/3">
                <p className="text-2xl font-medium">Ongoing</p>
                <p className="m-6 text-6xl">
                  67<span className="text-base">KM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Ride Selection & Pool Matching */}
          <div className="w-full md:w-[50%] flex flex-col gap-3 md:gap-5">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-8 flex flex-col items-center w-full mx-auto h-full transition-all duration-700 ease-in-out justify-center  ">
              {showRideSelection ? (
                <>
                  <p className="text-2xl text-stone-950 font-medium">Choose Ride</p>
                  <Lottie animationData={WalkingManAnimation} className="w-40 h-40" />
                  <div className="flex my-3 md:my-6 items-center gap-3">
                    <div className="flex flex-col gap-4 justify-center">
                      <p className="text-sm primary-color">Pickup</p>
                      <p className="text-sm yellow-color">Event</p>
                    </div>

                    <div className="w-[250px] flex flex-col gap-4 justify-center">
                      <input
                        type="text"
                        placeholder="Choose Location from map"
                        value={location1}
                        onClick={() => setActiveField("pickup")}
                        className="text-base text-black text-center outline-none"
                      />
                      <hr />
                      <input
                        type="text"
                        placeholder="Choose Event from map"
                        value={location2}
                        onClick={() => setActiveField("event")}
                        className="text-base text-black text-center outline-none"
                      />
                    </div>
                  </div>

                  {/* Ride Buttons */}
                  <div className="flex mt-4 md:y-auto gap-3">
                    <Button
                      onClick={() => handleConfirmRide("find")}
                      className="bg-green-600 md:w-[150px] text-white px-4 py-2 text-base md:text-lg rounded-3xl"
                    >
                      Find Ride
                    </Button>
                    <Button
                      onClick={() => handleConfirmRide("offer")}
                      className="bg-blue-500 md:w-[150px] text-white px-4 py-2 text-base md:text-lg rounded-3xl"
                    >
                      Offer Ride
                    </Button>
                  </div>
                </>
              ) : isRequesting ? (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <Lottie animationData={rideAnimation} className="w-40 h-40" />
                  <p className="text-xs text-center font-normal text-gray-600">
                    Searching for a partner within a 3km range...
                  </p>
                </div>
              ) : availableRides ? (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <RideCard />
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-gray-400">No rides available at the moment</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShareRide;
