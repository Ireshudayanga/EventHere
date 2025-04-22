/* eslint-disable react/prop-types */
// SearchBar.jsx
import React, { useContext } from 'react';
import searchIcon from '../assets/svg/Search.svg';
import { Link } from 'react-router-dom';
import userIcon from '../assets/svg/User.svg';
import home from '../assets/svg/Home.svg';
import { AuthContext } from '../context/AuthProvider';

function SearchBar({
  title = ""
}) {

  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  return (
    <div>
      {/* Top Navigation */}
      <div className="flex  py-3 px-4 md:py-2 md:px-8 justify-between items-center gap-2">
        <Link to="/">
          <img src={home} alt="home" className="w-6 h-6 hidden md:w-8 md:h-8" />
        </Link>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <img
            className="w-6 h-6 md:w-8 md:h-8"
            src={
              currentUser
                ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.displayName)}&backgroundColor=0D8ABC&textColor=ffffff&radius=50&size=128`
                : userIcon // fallback image if user not ready
            }
            alt="user"
          />

          <p className="hidden md:block text-black text-sm md:text-base uppercase">
            {currentUser?.displayName || "Loading..."}
          </p>

        </div>
      </div>
    </div>
  );
}

export default SearchBar;