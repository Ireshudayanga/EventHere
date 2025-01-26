import React from 'react'
import item01 from '../../assets/svg/item01.svg'
import item02 from '../../assets/svg/item02.svg'
import item03 from '../../assets/svg/item03.svg'
import item04 from '../../assets/svg/item04.svg'
import item05 from '../../assets/svg/item05.svg'
import item06 from '../../assets/svg/item06.svg'

const FeatureCard = () => {
    return (
        <div className="md:my-44 flex gap-6 md:gap-0 justify-center md:flex-col items-center feature-frame">
            <div className="flex flex-row gap-16 my-10 justify-center">
                <div className="featureframe flex flex-col items-center justify-center">
                    <div>
                        <img className="w-16 md:w-36" src={item01} alt="item01" />
                    </div>
                    <div className="mt-7 text-center text-[#464545]">Event Discovery</div>
                </div>
                <div className="featureframe flex flex-col items-center justify-center">
                    <div>
                        <img className="w-24 md:w-44" src={item02} alt="item01" />
                    </div>
                    <div className="mt-14 text-center text-[#464545]">Shared Rides</div>
                </div>
                <div className="featureframe flex flex-col items-center justify-center">
                    <div>
                        <img className="w-16 md:w-36" src={item03} alt="item01" />
                    </div>
                    <div className="mt-10 text-center text-[#464545]">Volunteer Options</div>
                </div>
            </div>
            <div className="flex flex-row gap-16 my-10 justify-center">
                <div className="featureframe flex flex-col items-center justify-center">
                    <div>
                        <img className="w-16 md:w-36" src={item04} alt="item01" />
                    </div>
                    <div className="mt-7 text-center text-[#464545]">Calendar Integration</div>
                </div>
                <div className="featureframe flex flex-col items-center justify-center">
                    <div>
                        <img className="w-20 md:w-28" src={item05} alt="item01" />
                    </div>
                    <div className="mt-7 text-center text-[#464545]">Real-Time Updates</div>
                </div>
                <div className="featureframe flex flex-col items-center justify-center">
                    <div>
                        <img className="w-16 md:w-36" src={item06} alt="item01" />
                    </div>
                    <div className="mt-7 text-center text-[#464545]">Social Engagement</div>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard
