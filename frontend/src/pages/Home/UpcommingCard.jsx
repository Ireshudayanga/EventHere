import React from 'react';
import forwardArrow from '../../assets/svg/ForwardArrow.svg';
import card01 from '../../assets/images/card01.jpg';

const UpcommingCard = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col text-center p-6 max-w-3xl">
          <div className="text-4xl primary-color font-bold">Discover Events That Matter to You</div>
          <div className="mt-6 text-gray-700">
            Explore upcoming events tailored to your interests. From exciting entertainment
            gatherings to meaningful traditional and religious celebrations, and opportunities
            to give back through volunteering, there’s something for everyone. Dive into your
            preferred category and make the most of every moment!
          </div>
        </div>
      </div>

      <div className="px-6 pt-24">
        <div className="border-2 border-[#2858b9] w-[239px] h-[370px] rounded-3xl flex flex-col items-center p-6 max-w-3xl">
          <div className="items-center justify-center flex">
            <img className="w-[150px] h-[150px] rounded-full object-cover" src={card01} alt="Event" />
          </div>
          <div className="mt-6 primary-color font-semibold text-xl">Event Name</div>
          <div className="mt-1 text-zinc-700">In this Sunday</div>
          <div className="flex justify-center items-center gap-2 mt-7">
            <div className="secondary-color">Explore</div>
            <img src={forwardArrow} className="w-6" alt="Arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcommingCard;
