import React from 'react'

const Hero = () => {
    return (
        <div className='mt-16 mb-72 hero-section'>
            <div className='text-3xl md:text-5xl lg:text-7xl text-center leading-snug lg:leading-tight font-semibold'>
                Bring People Together one 
                <span className='yellow-color text-4xl md:text-7xl lg:text-9xl italicfont'> Event </span> 
                at a Time
            </div>
            <div className='text-base md:text-lg lg:text-xl text-center my-4 md:my-8 lg:my-10 md:leading-relaxed lg:leading-normal'>
                From festivals to fundraisers, find events that matter to you and get there with shared rides.
            </div>

            {/* Hero Buttons */}
            <div className='flex justify-center space-x-8 md:space-x-16 lg:space-x-24 my-8 md:my-16 lg:my-24'>
                <button className='primarybutton'>Explore Event</button>
                <button className='secondarybutton'>Find Ride</button>
            </div>
        </div>
    )
}

export default Hero
