// SearchBar.jsx
import React from 'react';
import searchIcon from '../assets/svg/Search.svg';
import { Link } from 'react-router-dom';
import userIcon from '../assets/svg/User.svg';
import home from '../assets/svg/Home.svg';

function SearchBar() {
  return (
    <div>
      {/* Top Navigation */}
      <div className="flex  py-3 px-4 md:py-4 md:px-8 justify-between items-center gap-2">
        <Link to="/">
          <img src={home} alt="home" className="w-6 h-6 hidden md:w-8 md:h-8" />
        </Link>

        {/* Search Form - Hidden on mobile */}
        <form className="hidden md:flex items-center gap-4 px-6 md:px-9 py-2 md:py-3 text-base md:text-lg text-black bg-white rounded-xl md:rounded-2xl w-full max-w-[500px]">
          <img
            src={searchIcon}
            className="w-5 h-5 md:w-6 md:h-6"
            alt="Search"
          />
          <input
            type="search"
            id="searchInput"
            placeholder="Search for events..."
            className="flex-auto bg-transparent border-none outline-none"
          />
        </form>

        {/* Mobile Search Icon */}
        <button className="md:hidden p-2">
          <img src={searchIcon} className="w-6 h-6" alt="Search" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <img className="w-6 h-6 md:w-8 md:h-8" src={userIcon} alt="user" />
          <p className="hidden md:block text-black text-sm md:text-base">John Doe</p>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;