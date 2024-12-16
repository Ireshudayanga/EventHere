import React from 'react'
import logo from '../assets/images/300PPI.png'


const Navbar = () => {
  return (
    <div className='mx-[200px] flex flex-row items-center justify-between'>
      <div className='w-52'>
        <img src={logo} alt="EventHere Logo" />
      </div>

      <div className='w-[500px] bg-[#6a927e1d] border border-white rounded-2xl'>
        <ul
          tabIndex={0}
          className="flex flex-row items-center m-4 justify-between h-6">
          <li><a>Home</a></li>
          <li><a>Events</a></li>
          <li><a>Calendar</a></li>
          <li><a>Volunteer</a></li>
          <li><a>Explore</a></li>
        </ul>
      </div>

      <div className='flex items-center gap-7'>
        {/* Search Icon */}
        <div className="w-6 h-6">
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Login */}
        <div className="custom-button flex items-center justify-center flex-row gap-4 w-[140px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="gap-4 inline-block">
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
              fill="rgb(25, 122, 232)"
            />
          </svg>
          <div>Login</div>
        </div>
      </div>
    </div>

  )
}

export default Navbar
