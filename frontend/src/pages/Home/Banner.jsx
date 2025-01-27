import React from 'react';
import feature01 from '../../assets/svg/feature01.svg';
import feature02 from '../../assets/svg/feature02.svg';
import feature03 from '../../assets/svg/feature03.svg';

const Banner = () => {
  return (
    <div className=" flex flex-row  w-full  mt-44 banner">
      {/* Left side - Images */}
      <div className="relative imgFrameFullHeight flex md:flex-row md:w-1/2">
        {/* Frame 1 */}
        <div className="imgframe1 flex justify-center items-center ">
          <img className="w-[90px] md:w-[180px] transform scale-x-[-1] mt-[20px]" src={feature01} alt="feature01" />
        </div>

        {/* Frame 2 */}
        <div className="imgframe2 flex justify-center items-center m-auto md:absolute   md:top-[160px] md:left-[120px]">
          <img className="w-[120px] md:w-[200px] mt-4 md:mt-[60px]" src={feature02} alt="feature02" />
        </div>

        {/* Frame 3 */}
        <div className="imgframe3 flex justify-center items-center  absolute md:left-[260px]">
          <img className="w-[90px] md:w-[180px] md:ml-6 my-4 md:mt-[50px]" src={feature03} alt="feature03" />
        </div>
      </div>

      {/* Right side - Text Content */}
      <div className="md:w-1/2 text-center md:text-left ">
        <h2 className="md:text-6xl text-3xl font-semibold mb-4 leading-snug md:leading-tight">
          Power Up Your <br /> Events <br />With <span className='primary-color'>Event</span><span className='yellow-color'>Here</span>
        </h2>
        <p className="my-10 md:my-14 text-gray-700 leading-loose md:leading-loose">
          EventHere makes finding, attending, and sharing events effortless. Discover events tailored to you, carpool with others, stay organized with a personal calendar, and connect through comments and reviews. Make an impact by volunteering or donating,
          and earn eco-friendly badges along the way. EventHere brings people together.
        </p>
      </div>

    </div>
  );
};

export default Banner;
