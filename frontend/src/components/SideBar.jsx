import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Sidebar01 from '../assets/svg/Sidebar01.svg';
import Sidebar02 from '../assets/svg/Sidebar02.svg';
import Sidebar03 from '../assets/svg/Sidebar03.svg';
import Sidebar04 from '../assets/svg/Sidebar04.svg';
import Sidebar05 from '../assets/svg/Sidebar05.svg';
import Sidebar06 from '../assets/svg/Sidebar06.svg';

const SideBar = () => {
    const [activePage, setActivePage] = useState(1);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const sidebarItems = [
        { id: 1, icon: Sidebar01, alt: "Dashboard", path: "/events" },
        { id: 2, icon: Sidebar02, alt: "Share Ride", path: "/share-ride" },
        { id: 3, icon: Sidebar03, alt: "Message", path: "/message" },
        { id: 4, icon: Sidebar04, alt: "Add Events", path: "/add-events" },
    ];

    const bottomItems = [
        { id: 5, icon: Sidebar05, alt: "Profile", path: "/profile" },
        { id: 6, icon: Sidebar06, alt: "Back", path: "/" },
    ];

    const handleNavigation = (id, path) => {
        setActivePage(id);
        navigate(path);
        setIsOpen(false); // Close sidebar on selection
    };

    return (
        <>
            {/* Hamburger Menu Button (For Mobile & Tablet) */}
            <button
                className={`md:hidden lg:hidden text-black  fixed top-4 left-4 z-[1500] p-2 shadow-lg rounded-md transition-all ${isOpen ? "hidden" : "block"
                    }`}
                onClick={() => {
                    setIsOpen(true)
                    console.log('clicked-------------')
                }}
            >
                <FiMenu  size={24} />
            </button>

            {/* Sidebar (Hidden by default on Mobile & Tablet) */}
            <div className={`h-screen z-[1500] w-60 fixed left-0 top-0 bg-white shadow-xl flex flex-col justify-between py-6 transition-transform duration-300 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-20`}>

                {/* Close Button for Mobile & Tablet */}
                {isOpen && (
                    <button
                        className="md:hidden lg:hidden absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
                        onClick={() => setIsOpen(false)}
                    >
                        <FiX size={24} />
                    </button>
                )}

                {/* Main Navigation Items */}
                <div className="flex flex-col items-center gap-2">
                    {sidebarItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative w-full py-3 flex items-center group cursor-pointer"
                            onClick={() => handleNavigation(item.id, item.path)}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {/* Active Indicator */}
                            <div className={`absolute left-0 h-6 w-1  rounded-r-full transition-transform duration-300 
                                ${activePage === item.id ? 'translate-y-0' : '-translate-y-2'}
                                ${hoveredItem === item.id ? 'opacity-30 scale-y-150' : ''}`} />

                            {/* Icon & Name Container */}
                            <div className={`flex items-center p-2 rounded-xl transition-all duration-300 
                                ${activePage === item.id ? 'bg-[#34a853]/10 transform scale-110' : 'hover:bg-gray-100'}`}>
                                <img
                                    src={item.icon}
                                    alt={item.alt}
                                    className={`w-8 h-8 transition-all duration-300 
                                        ${activePage === item.id ? 'filter brightness-125 saturate-150' : 'opacity-70 group-hover:opacity-100'}`}
                                />
                                {isOpen && (
                                    <span className="ml-3 text-gray-700 font-medium">{item.alt}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Navigation Items */}
                <div className="flex flex-col items-center gap-4">
                    {bottomItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative w-full py-2 flex items-center group cursor-pointer"
                            onClick={() => handleNavigation(item.id, item.path)}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {/* Active Indicator for Bottom Items */}
                            <div className={`absolute left-0 h-6 w-1  rounded-r-full transition-transform duration-300 
                                ${activePage === item.id ? 'translate-y-0' : '-translate-y-2'}
                                ${hoveredItem === item.id ? 'opacity-30 scale-y-150' : ''}`} />

                            {/* Icon & Name Container */}
                            <div className={`flex items-center p-2 rounded-xl transition-all duration-300 
                                ${activePage === item.id ? 'bg-[#34a853]/10 transform scale-110' : 'hover:bg-gray-100'} ${item.id === 6 ? 'mt-4' : ''}`}>
                                <img
                                    src={item.icon}
                                    alt={item.alt}
                                    className={`w-8 h-8 transition-all duration-300 
                                        ${activePage === item.id ? 'filter brightness-125 saturate-150' : 'opacity-70 group-hover:opacity-100'} 
                                        ${item.id === 6 ? 'w-[49px] h-[49px] -m-1' : ''}`}
                                />
                                {isOpen && (
                                    <span className="ml-3 text-gray-700 font-medium">{item.alt}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideBar;
