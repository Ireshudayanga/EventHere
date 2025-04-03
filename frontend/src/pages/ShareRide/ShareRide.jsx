/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import ShareRideMap from "../../components/mapType/ShareRideMap";
import RideCard from "./RideCard";
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
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useSocket } from "../../socket/SocketPrivider";


const ShareRide = () => {
   const { socket } = useSocket();
  const { currentUser,loading } = useContext(AuthContext);



  // !loading && console.log("Current User:", currentUser.displayName);

  // Pickup and Drop location states
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");

  // Tracks active input field ("pickup" or "event")
  const [activeField, setActiveField] = useState(null);

  // Controls ride selection visibility
  const [showRideSelection, setShowRideSelection] = useState(true);

  // Ride status
  const [isRequesting, setIsRequesting] = useState(false);
  const [availableRides, setAvailableRides] = useState([]); 

  // Ride index for selection ( If there multiple matching rides)
  const [rideIndex, setRideIndex] = useState(0);


  const dispatch = useDispatch();

  // Fetch events and categories on component mount
  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchSpecialCategory());
  }, [dispatch]);


  const axiosPublic = useAxiosPublic();

  // Handle ride request/offer
  const handleConfirmRide = async (type) => {
    if (!location1 || !location2) {
      alert("Please select both Pickup and Event locations.");
      return;
    }

    const pickupCoords = location1.split(',').map(Number);
    const dropCoords = location2.split(',').map(Number);

    const pickupLocation = {
      type: "Point",
      coordinates: [pickupCoords[1], pickupCoords[0]], // lng, lat
    };
    const eventLocation = {
      type: "Point",
      coordinates: [dropCoords[1], dropCoords[0]],
    };

    // Find Ride Part
    if (type === "find") {
      try {
        console.log("Finding rides...");
        const res = await axiosPublic.post("/rides/find-matches", {
          userName: currentUser?.displayName,
          email: currentUser?.email,
          pickupLocation,
          eventLocation,
        });


        const matchedRides = res.data.rides;
        console.log("Matched rides:", matchedRides);
        
        setIsRequesting(false);
        setShowRideSelection(false);

        if (matchedRides.length > 0) {
          setAvailableRides(matchedRides);
          toast.success("Matching rides found");
        } else {
          setAvailableRides(null);
          toast.info("No ride found. We'll notify you if a match becomes available.");
        }

      } catch (error) {
        console.error(error);
        toast.error("Error finding rides");
      }
      return;
    }


    // Offering Ride Part ||
    const rideData = {
      userName: currentUser?.displayName,
      email: currentUser?.email,
      rideType: type,
      pickupLocation,
      eventLocation,
    };

    dispatch(addRide(rideData))
      .then(unwrapResult)
      .then((data) => {

        toast.success("Ride added successfully");
        setIsRequesting(false);
        setShowRideSelection(false);

        const matchedRides = data.rides;
        console.log("Matched rides:", matchedRides);
        if (matchedRides.length > 0) {
          setAvailableRides(matchedRides);
          toast.success("Matching rides found");
          console.log("Matched rides:", matchedRides);
        } else {
          setAvailableRides(null);
          toast.info("No ride found. We'll notify you if a match becomes available.");
        }
       
      })
      .catch((err) => console.error(err));
  };

  const handleAccept = () => {
    const currentRide = availableRides[rideIndex];
    console.log("Accepted ride:", currentRide);
  
    socket.current.emit("ride-accept-request", {
      to: currentRide.email, // receiver
      name: currentUser.displayName, // sender
      from: currentUser.email, // sender
      rideId: currentRide._id, // optional
    });
  
    toast.info("Waiting for confirmation...");
  };
  
  
  const handleCancel = () => {
    const nextIndex = rideIndex + 1;
    if (nextIndex < availableRides.length) {
      setRideIndex(nextIndex);
    } else {
      setAvailableRides(null);
      toast.info("No more rides found.");
    }
  };
  
  useEffect(() => {
    if (!socket.current) return;
  
    const handleConfirmed = () => {
      toast.success("Ride confirmed! 🎉");
      // Here, you can start a ride session or navigate to chat
    };
  
    const handleRejected = () => {
      toast.error("Ride was rejected");
      handleCancel(); // Show next match
    };
  
    socket.current.on("ride-confirmed", handleConfirmed);
    socket.current.on("ride-rejected", handleRejected);
  
    return () => {
      socket.current.off("ride-confirmed", handleConfirmed);
      socket.current.off("ride-rejected", handleRejected);
    };
  }, [socket.current, handleCancel]);
  


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
              ) : availableRides && availableRides.length > 0 ? (
                <div className="flex flex-col items-center justify-center h-full w-full">
                <RideCard
                  ride={availableRides[rideIndex]}
                  onAccept={handleAccept}
                  onCancel={handleCancel}
                />
                </div>
              ) : (
                <p className="text-gray-400">
                  No rides found right now. Your request is saved and we will notify you if a match appears!
                </p>
              )}
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShareRide;
