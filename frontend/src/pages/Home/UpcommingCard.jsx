import React, { useState, useEffect } from 'react';
import forwardArrow from '../../assets/svg/ForwardArrow.svg';

const UpcommingCard = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // Fetch the JSON data from the public folder
    fetch('/event.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCardData(data);
        // console.log('Event data:', data);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center h-[800px] ">
      <div className="text-center p-6 max-w-3xl">
        <div className="text-4xl primary-color font-bold">Discover Events That Matter to You</div>
        <div className="mt-6 text-gray-700">
          Explore upcoming events tailored to your interests. From exciting entertainment
          gatherings to meaningful traditional and religious celebrations, and opportunities
          to give back through volunteering, there’s something for everyone. Dive into your
          preferred category and make the most of every moment!
        </div>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 px-6 pt-24">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            className={`border-2 border-[#2858b9] w-[200px] h-[330px] rounded-3xl flex flex-col items-center p-6 ${index % 2 === 1 ? 'translate-y-6' : '-translate-y-6'
              }`}
          >
            <div className="items-center justify-center flex">
              <img className="w-[150px] h-[150px] rounded-full object-cover" loading='lazy' src={card.image} alt={card.title} />
            </div>
            <div className="mt-6 primary-color font-semibold text-xl">{card.title}</div>
            <div className="mt-1 text-zinc-700">{card.description}</div>
            <div className="flex justify-center items-center gap-2 mt-7">
              <button>
                <div className="secondary-color">Explore</div>
              </button>
              <img src={forwardArrow} className="w-6" alt="Arrow" />
            </div>
          </div>
        ))}
      </div>
      {/* See All Button */}
      <div className="flex justify-center mt-24">
        <button className="flex items-center  cardButton">
          <div className="">See All Events</div>
        </button>
      </div>
    </div>
  );
};

export default UpcommingCard;
