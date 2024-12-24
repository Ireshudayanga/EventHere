import React from 'react';
import forwardArrow from '../../assets/svg/ForwardArrow.svg'; 
const UpcommingCard = () => {
  return (
    <div>

      <div className="flex justify-center items-center ">
        <div className="flex flex-col text-center p-6 max-w-3xl">
          <div className="text-4xl primary-color font-bold">Discover Events That Matter to You</div>
          <div className="mt-6  text-gray-700">
            Explore upcoming events tailored to your interests. From exciting entertainment
            gatherings to meaningful traditional and religious celebrations, and opportunities
            to give back through volunteering, there’s something for everyone. Dive into your
            preferred category and make the most of every moment!
          </div>
        </div>
      </div>

      <div className='px-6 pt-24'>
        <div className='border-2 border-[#2858b9] w-[239px] h-[370px] rounded-3xl flex flex-col items-center p-6 max-w-3xl'>
          <div className='bg-black w-16 h-10'></div>
          <div>Event Name</div>
          <div>In this sunday</div>
         <div className='flex justify-center items-center '>
         <div>Explore </div>
         <img src={forwardArrow}  />
         </div>
        </div>
      </div>
    </div>
  );
};

export default UpcommingCard;
