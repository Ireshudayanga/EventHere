import React from 'react'
import '../Home/Home.css'
import Hero from './Hero'
import Banner from './Banner'
import FeatureCard from './FeatureCard'
import UpcommingCard from './UpcommingCard'
import Testimonial from './Testimonial'
const Home = () => {
  return (
    <div>
      <div className=' my-16 lg:my-28 px-6 md:px-40'>
        <Hero />
      </div>
      <div className="px-3 lg:px-40">
        <Banner />
      </div>
      <div className="px-2 md:px-6">
        <FeatureCard/>
      </div>
      <div className="px-2 md:px-6">
       <UpcommingCard/>
      </div>
      <div className="px-2 md:px-6">
       <Testimonial/>
      </div>
    </div>
  )
}

export default Home
