import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import the hook for navigation
import logo from "../assets/images/300PPI.png";
import Signup from "./Signup";
import Modal from "./Modal";

const Navbar = () => {
  const [activePage, setActivePage] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle
  const navigate = useNavigate(); // Initialize navigate hook
  const navItems = ["Home", "Events", "Calendar", "Volunteer", "Explore"];

  const handleNavigation = (item) => {
    setActivePage(item);
    setIsMenuOpen(false); // Close menu after navigation
    navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`);
  };

  return (
    <div className="mx-4 sm:mx-10 lg:mx-20 flex flex-row items-center justify-between py-4">
      {/* Logo Section */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <div className="w-28 sm:w-36 lg:w-52">
          <img src={logo} alt="EventHere Logo" />
        </div>

        {/* Hamburger Menu Icon */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute lg:static top-16 left-0 w-full bg-[#1A73E8] lg:bg-transparent lg:block z-50`}
      >
        <ul className="flex flex-col lg:flex-row items-center lg:gap-6 py-4 lg:py-0">
          {navItems.map((item) => (
            <li
              key={item}
              className={`ml-4 relative px-5 py-2 lg:py-0 text-white cursor-pointer ${
                activePage === item ? "font-bold" : "font-normal"
              }`}
              onClick={() => handleNavigation(item)}
            >
              {item}
              {activePage === item && (
                <span className="absolute bottom-[-4px] left-0 w-full h-1 bg-white rounded-full" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex items-center gap-6">
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

        {/* Login Button */}
       
        <button onClick={() => document.getElementById("LoginModel").showModal()} className="custom-button flex items-center gap-2 px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
              fill="#ffffff"
            />
          </svg>
          <span>Login</span>
        </button>
        <Modal/>
       
      </div>
    </div>
  );
};

export default Navbar;
