import React from 'react'
import '../Home/Home.css'
import Hero from './Hero'
import Banner from './Banner'
const Home = () => {
  return (
    <div>
      <div className=' my-16 lg:my-28 px-6 md:px-40'><Hero /></div>
      <div className=" px-2 md:px-6">
        <Banner />
      </div>
    </div>
  )
}

export default Home
