import { useEffect } from 'react'
import '../Home/Home.css'
import Hero from './Hero'
import Banner from './Banner'
import FeatureCard from './FeatureCard'
import UpcommingCard from './UpcommingCard'
import Testimonial from './Testimonial'
import ImageUpload from '../../components/ImageUpload'


const Home = () => {



  
  return (
    <div className=''>
      <div className=' md:my-28 px-6 md:px-40'>
        <Hero />
      </div>
      <div className="px-2 md:px-14 ">
        <Banner />
      </div>
      <div className="px-2 md:px-6">
        <FeatureCard/>
      </div>
      <div className="px-2 md:px-6">
       <UpcommingCard/>
      </div>
      <ImageUpload/>
      <div className="px-2 md:px-6">
       <Testimonial/>
      </div>
    </div>
  )
}

export default Home
