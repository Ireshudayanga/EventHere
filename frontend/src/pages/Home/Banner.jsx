import React from 'react';
import feature01 from '../../assets/svg/feature01.svg'; 
import feature02 from '../../assets/svg/feature02.svg';
import feature03 from '../../assets/svg/feature03.svg';

const Banner = () => {
  return (
    <div className=" flex flex-row items-start w-full px-6 md:px-20 mt-28 ">
      {/* Left side - Images */}
      <div className="relative w-1/2 flex flex-row">
        {/* Frame 1 */}
        <div className="imgframe1  top-[50px] left-0">
          <img className="w-[180px] transform scale-x-[-1] mt-[50px]" src={feature01} alt="feature01" />
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
      <div className="w-1/2 pl-8">
        <h2 className="text-2xl font-semibold mb-4">Lorem Ipsum</h2>
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa vel velit ab obcaecati architecto
          nam distinctio excepturi non eaque, iure beatae tempora ullam 
          sint corporis aliquam deleniti id sit! Repellat.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Perspiciatis consequuntur suscipit minima sed nesciunt nobis, vel, corrupti distinctio,
          pariatur libero possimus sit repellat non incidunt unde voluptatum harum ad similique!
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Perspiciatis consequuntur suscipit minima sed nesciunt nobis, vel, corrupti distinctio,
          pariatur libero possimus sit repellat non incidunt unde voluptatum harum ad similique!
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Perspiciatis consequuntur suscipit minima sed nesciunt nobis, vel, corrupti distinctio,
          pariatur libero possimus sit repellat non incidunt unde voluptatum harum ad similique!
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Perspiciatis consequuntur suscipit minima sed nesciunt nobis, vel, corrupti distinctio,
        </p>
      </div>
    </div>
  );
};

export default Banner;
