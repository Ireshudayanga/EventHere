import React, { useState, useEffect } from "react";
import forwardArrow from "../../assets/svg/ForwardArrow.svg";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UpcommingCard = () => {
  const [cardData, setCardData] = useState([]);
  const  axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/events")
      .then((response) => {
        setCardData(response.data); // Axios automatically parses JSON
      })
      .catch((error) => {
        console.error("Error fetching event data:", error.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="flex flex-col items-center h-auto upcoming-card-container">
      {/* Header Section */}
      <div className="text-center px-4 py-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl primary-color font-bold">
          Discover Events That Matter to You
        </h1>
        <p className="mt-4 text-gray-700 text-sm md:text-base">
          Explore upcoming events tailored to your interests. From exciting
          entertainment gatherings to meaningful traditional and religious
          celebrations, and opportunities to give back through volunteering,
          there’s something for everyone. Dive into your preferred category and
          make the most of every moment!
        </p>
      </div>

      {/* Carousel for Mobile & Tablet Screens */}
      <div className=" lg:hidden w-full  overflow-x-auto px-4 mt-6 flex gap-6 scrollbar-hide">
        {cardData.map((card, index) => (
          <div
            key={card.id ? card.id : `event-${index}`} // Ensure unique keys
            className="min-w-[200px] md:min-w-[250px] border-2 border-[#2858b9] h-[300px] rounded-3xl flex flex-col items-center p-4"
          >
            <div className="flex justify-center">
              <img
                className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full object-cover"
                loading="lazy"
                src={card.imageUrl}
                alt={card.title}
              />
            </div>
            <h2 className="mt-4 text-lg md:text-xl primary-color font-semibold">
              {card.title.length > 15 ? card.title.slice(0, 15) + "..." : card.title}
            </h2>
            <p className="mt-2 text-sm md:text-base text-zinc-700 text-center">
              {card.description.length > 30 ? card.description.slice(0, 30) + "..." : card.description}
            </p>
            <div className="flex justify-center items-center gap-2 mt-6">
              <button className="secondary-color text-sm md:text-base">Explore</button>
              <img src={forwardArrow} className="w-4 md:w-6" alt="Arrow" />
            </div>
          </div>
        ))}

      </div>


      {/* Grid Layout for Desktop Screens */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-6 px-4 pt-12">
        {cardData.slice(0, 5).map((card, index) => (
          <div
            key={card.id || `event-${index}`}
            className={`border-2 border-[#2858b9] w-full max-w-[200px] mx-auto h-[380px] rounded-3xl flex flex-col items-center p-4 ${index % 2 === 1 ? "translate-y-4" : "-translate-y-4"
              }`}
          >
            <div className="flex justify-center">
              <img
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full object-cover"
                loading="lazy"
                src={card.imageUrl}
                alt={card.title}
              />
            </div>
            <h2 className="mt-4 text-lg md:text-xl primary-color font-semibold text-center">
              {card.title.length > 15 ? card.title.slice(0, 15) + "..." : card.title}
            </h2>
            <p className="mt-2 text-sm md:text-md text-zinc-700 text-center">
              {card.description.length > 30 ? card.description.slice(0, 30) + "..." : card.description}
            </p>


            <div className="flex justify-center items-center gap-2 mt-6">
              <button className="secondary-color text-sm md:text-base text-center">
                Explore
              </button>
              <img src={forwardArrow} className="w-4 md:w-6" alt="Arrow" />
            </div>
          </div>
        ))}
      </div>


      {/* See All Button */}
      <div className="flex justify-center my-16 md:mt-12">
        <button className="flex items-center px-4 py-2 bg-[#34A853] text-white rounded-lg hover:bg-[#1A73E8]">
          See All Events
        </button>
      </div>
    </div>
  );
};

export default UpcommingCard;

