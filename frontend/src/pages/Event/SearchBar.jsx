import React from 'react';
import searchIcon from '../../assets/svg/Search.svg'

function SearchBar() {
  return (
    <form className="flex gap-4 px-9 py-3 text-lg text-black bg-white rounded-2xl max-md:px-5">
      <img
        loading="lazy"
        src={searchIcon}
        className="object-contain shrink-0 self-start w-6 aspect-square"
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