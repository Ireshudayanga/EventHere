import React from 'react'
import logo from '../assets/images/1000PPI.png'

const Navbar = () => {
  return (
    <div className=' flex flex-row items-center justify-between'>
      <div className='w-52'><img src={logo} alt="EventHere Logo" /></div>
      <div className='w-[400px]'>
        <ul
          tabIndex={0}
          className="flex flex-row justify-between">
          <li><a>Item 1</a></li>
          <li><a>Parent</a></li>
          <li><a>Item 3</a></li>
          <li><a>Item 3</a></li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className=''>login</div>
    </div>
  )
}

export default Navbar
