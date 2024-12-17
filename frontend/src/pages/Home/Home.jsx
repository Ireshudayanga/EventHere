import React from 'react'
import '../Home/Home.css'
import Hero from './Hero'
import Banner from './Banner'
const Home = () => {
  return (
    <div>
      <div className='mx-[200px]'><Hero /></div>
      <div className='bg-gradient-black-transparent h-[2040px]'>
        <div className='mx-[200px]'>
          <Banner />
        </div>
      </div>
    </div>
  )
}

export default Home
