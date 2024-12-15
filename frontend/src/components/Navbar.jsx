import React from 'react'
import logo from '../assets/images/1000PPI.png'

const Navbar = () => {
  return (
    <div className=' flex flex-row items-center justify-between'>
      <div className='w-52'><img src={logo} alt="EventHere Logo" /></div>
      <div className='w-[400px] bg-[#2c302e1d]'>
        <ul
          tabIndex={0}
          className="flex flex-row items-center m-4 justify-between h-14">
          <li><a>Home</a></li>
          <li><a>Events</a></li>
          <li><a>Calendar</a></li>
          <li><a>Volunteer</a></li>
          <li><a>Explore</a></li>
        </ul>
      </div>
      <div className=''>login</div>
    </div>
  )
}

export default Navbar
