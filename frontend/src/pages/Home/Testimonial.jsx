import React from 'react';
import testimonialImage from '../../assets/images/testimonialImage.png';

const Testimonial = () => {
    return (
        <div className=" lg:my-44 flex justify-center items-center">
            <div className="flex flex-row items-center gradient-bg w-[800px] h-[550px] rounded-3xl p-8">
                {/* Left side - Text Content */}
                <div className="w-1/2 pr-8">
                    <h1 className="text-5xl font-semibold leading-tight  text-white">Upcoming Events You Can’t Miss!</h1>
                    <p className="text-white mt-4 leading-relaxed text-[10px]">
                        Discover the most exciting events happening near you! Whether
                        it’s a vibrant music festival, a cultural celebration, or a
                        meaningful charity event, there’s something for everyone on EventHere.
                        Explore our curated list of trending events and find your next adventure.
                        Don’t wait—secure your spot, connect with others, and make unforgettable memories.
                    </p>
                    {/* See All Button */}
                    <div className="flex justify-start mt-12">
                        <button className="flex items-center bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all">
                            Join now
                        </button>
                    </div>
                </div>
                {/* Right side - Image */}
                <div className="w-1/2 h-full flex justify-center items-center">
                    <img
                        className="w-full h-full rounded-3xl object-cover"
                        src={testimonialImage}
                        alt="Upcoming Events"
                    />
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
