import React from 'react';
import searchIcon from '../../assets/svg/Search.svg';
import { Link } from 'react-router-dom';
import userIcon from '../../assets/svg/User.svg';
import home from '../../assets/svg/Home.svg';

function SearchBar() {
  return (
    <div>
      {/* Top Navigation */}
      <div className="flex flex-row py-4 px-8 justify-between items-center">
        <Link to="/"> <img src={home} alt="home" className="w-8 h-8" /></Link>

        <form className="flex items-center gap-4 px-9 py-3 text-lg text-black bg-white rounded-2xl max-md:px-5 w-[40%]">
          <img
            loading="lazy"
            src={searchIcon}
            className="object-contain shrink-0 w-6 aspect-square"
            alt="Search Icon"
          />
          <label htmlFor="searchInput" className="sr-only">Search for events</label>
          <input
            type="search"
            id="searchInput"
            placeholder="Search for events..."
            className="flex-auto bg-transparent border-none outline-none"
          />
        </form>
        <div className="flex flex-row items-center gap-4">
          <img className="w-8" src={userIcon} alt="user icon" />
          <p className="text-black">John Doe</p>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
