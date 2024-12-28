import React from 'react';
import searchIcon from '../../assets/svg/Search.svg';

function SearchBar() {
  return (
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
  );
}

export default SearchBar;
