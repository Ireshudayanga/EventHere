import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/300PPI.png";
import { AuthContext } from "../context/AuthProvider";
import Modal from "./Modal";

const AuthButton = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => (window.location.href = "/"))
      .catch(() => alert("Logout failed. Try again."));
  };

  return currentUser ? (
    <button
      onClick={handleLogout}
      className="custom-button flex items-center gap-2 px-4 py-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
          fill="#ffffff"
        />
      </svg>
      <span>Logout</span>
    </button>
  ) : (
    <button
      onClick={() => document.getElementById("LoginModel").showModal()}
      className="custom-button flex items-center gap-2 px-4 py-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
          fill="#ffffff"
        />
      </svg>
      <span>Login</span>
    </button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Calendar", href: "/calendar" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Explore", href: "/explore" },
  ];

  return (
    <nav className="mx-4 sm:mx-10 lg:mx-20 py-4">
      {/* Main row */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="w-28 sm:w-36 lg:w-52">
          <img src={logo} alt="EventHere Logo" />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-8 text-white font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Mobile hamburger + auth buttons (mobile & desktop separately) */}
        <div className="flex items-center gap-4">
          {/* Desktop login/logout */}
          <div className="hidden lg:block">
            <AuthButton />
          </div>

          {/* Mobile login/logout */}
          <div className="block lg:hidden">
            <AuthButton />
          </div>

          {/* Hamburger icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white focus:outline-none"
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

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 bg-[#1A73E8] p-4 rounded-md">
          <ul className="flex flex-col gap-4 text-white font-medium text-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Login modal component */}
      <Modal />
    </nav>
  );
};

export default Navbar;
