import React from 'react'

const Hero = () => {
    return (
        <div className='mt-16 mb-72'>
            <div className='text-3xl md:text-7xl text-center  leading-snug font-semibold'>
                Bring People Together one <span className='yellow-color text-5xl md:text-9xl italicfont'>Event  </span>at a Time
            </div>
            <div className='md:text-xl text-center my-4 md:my-10'>
                From festivals to fundraisers, find events that matter to you  and get there with shared rides
            </div>

            {/* Hero Buttons */}
            <div className='flex justify-center space-x-10  md:space-x-24 my-12 md:my-24'>
                <button className='primarybutton'>Explore Event</button>
                <button className='secondarybutton'>Find Ride</button>
            </div>
        </div>
    )
}

export default Hero
