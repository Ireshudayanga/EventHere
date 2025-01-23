import React from 'react';
import testimonialImage from '../../assets/images/testimonialImage.png';

const Testimonial = () => {
    return (
        <div className="lg:my-44 flex justify-center items-center px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row items-center gradient-bg max-w-4xl w-full rounded-3xl p-6 lg:p-8">
                {/* Left side - Text Content */}
                <div className="w-full lg:w-1/2 lg:pr-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
                        Upcoming Events You Can’t Miss!
                    </h1>
                    <p className="text-white mt-4 text-sm sm:text-base leading-relaxed">
                        Discover the most exciting events happening near you! Whether it’s a vibrant music festival, 
                        a cultural celebration, or a meaningful charity event, there’s something for everyone on EventHere. 
                        Explore our curated list of trending events and find your next adventure. Don’t wait—secure your spot, 
                        connect with others, and make unforgettable memories.
                    </p>
                    {/* Join Now Button */}
                    <div className="flex justify-start mt-8">
                        <button className="bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-green-600 transition-all">
                            Join Now
                        </button>
                    </div>
                </div>
                {/* Right side - Image */}
                <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-full flex justify-center items-center mt-6 lg:mt-0">
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
