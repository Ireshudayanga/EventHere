import React from 'react';
import feature01 from '../../assets/svg/feature01.svg'; 
import feature02 from '../../assets/svg/feature02.svg';
import feature03 from '../../assets/svg/feature03.svg';

const Banner = () => {
  return (
    <div className=" flex flex-row  w-full  mt-44 ">
      {/* Left side - Images */}
      <div className="relative md:w-1/2 flex flex-row">
        {/* Frame 1 */}
        <div className="imgframe1  top-[50px] left-0">
          <img className=" md:w-[180px] transform scale-x-[-1] mt-[50px]" src={feature01} alt="feature01" />
        </div>

        {/* Frame 2 */}
        <div className="imgframe2 absolute top-[160px] left-[120px]">
          <img className="w-[200px] mt-[100px]" src={feature02} alt="feature02" />
        </div>

        {/* Frame 3 */}
        <div className="imgframe3 absolute left-[260px]">
          <img className="w-[180px] ml-6 mt-[80px]" src={feature03} alt="feature03" />
        </div>
      </div>

      {/* Right side - Text Content */}
      <div className="w-1/2 ">
        <h2 className="text-5xl font-semibold mb-4 leading-tight">Power Up Your <br /> Events <br />With <span className='primary-color'>Event</span><span className='yellow-color'>Here</span></h2>
        <p className=" my-14 text-gray-700 leading-loose">
        EventHere makes finding, attending, and sharing events effortless. Discover events tailored to you, carpool with others, stay organized with a personal calendar, and connect through comments and reviews. Make an impact by volunteering or donating, 
        and earn eco-friendly badges along the way. EventHere brings people together.
        </p>
      </div>
    </div>
  );
};

export default Banner;
