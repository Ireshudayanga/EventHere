import React from 'react';
import feature01 from '../../assets/svg/feature01.svg'; // Import as default

const Banner = () => {
  return (
    <div>
      <div className='w-1/2 flex flex-row relative pt-[200px]'>
        <div className='imgframe1 absolute'>
          <img className='w-[250px] transform scale-x-[-1]  mt-[50px]' src={feature01} alt='feature01' />
        </div>
        <div className='imgframe2 absolute top-[420px] left-[140px]'></div>
        <div className='imgframe3 absolute left-[350px]'></div>
      </div>
      <div className='w-1/2'></div>
    </div>
  );
};

export default Banner;
