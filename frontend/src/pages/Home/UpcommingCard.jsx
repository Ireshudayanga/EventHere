import React from 'react';
import forwardArrow from '../../assets/svg/ForwardArrow.svg';
import card01 from '../../assets/images/card01.jpg';
import card02 from '../../assets/images/card02.jpg';
import card03 from '../../assets/images/card03.jpg';
import card04 from '../../assets/images/card04.jpg';
import card05 from '../../assets/images/card05.jpg';

const cardData = [
  {
    id: 1,
    image: card01,
    title: 'Mega Blast',
    description: 'Happening ',
  },
  {
    id: 2,
    image: card02,
    title: 'Vesak Festival',
    description: 'Visit us !!....',
  },
  {
    id: 3,
    image: card03,
    title: 'Health Clinic',
    description: 'In your Area.....',
  },
  {
    id: 4,
    image: card04,
    title: 'Black Friday',
    description: 'In this weekend !!',
  },
  {
    id: 5,
    image: card05,
    title: 'Nova Star',
    description: '31 Night Chill !!',
  },
];

const UpcommingCard = () => {
  return (
    <div className="flex flex-col items-center">
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 px-6 pt-16">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="border-2 border-[#2858b9] w-[239px] h-[370px] rounded-3xl flex flex-col items-center p-6"
          >
            <div className="items-center justify-center flex">
              <img className="w-[150px] h-[150px] rounded-full object-cover" src={card.image} alt={card.title} />
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
    </div>
  );
};

export default UpcommingCard;
