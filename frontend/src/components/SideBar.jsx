import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar01 from '../assets/svg/Sidebar01.svg';
import Sidebar02 from '../assets/svg/Sidebar02.svg';
import Sidebar03 from '../assets/svg/Sidebar03.svg';
import Sidebar04 from '../assets/svg/Sidebar04.svg';
import Sidebar05 from '../assets/svg/Sidebar05.svg';
import Sidebar06 from '../assets/svg/Sidebar06.svg';

const SideBar = () => {
    const [activePage, setActivePage] = useState(1);
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();

    const sidebarItems = [
        { id: 1, icon: Sidebar01, alt: "Dashboard", path: "/events" },
        { id: 2, icon: Sidebar02, alt: "Share Ride", path: "/share-ride" },
        { id: 3, icon: Sidebar03, alt: "Message", path: "/message" },
        { id: 4, icon: Sidebar04, alt: "Add Events", path: "/add-events" },
    ];

    const bottomItems = [
        { id: 5, icon: Sidebar05, alt: "Profile", path: "/profile" },
        { id: 6, icon: Sidebar06, alt: "Back", path: "/back" },
    ];

    const handleNavigation = (id, path) => {
        setActivePage(id);
        navigate(path);
    };

    return (
        <div className="h-screen w-20 fixed left-0 top-0 bg-white shadow-xl flex flex-col justify-between py-8 transition-all duration-300 hover:shadow-2xl">
            {/* Main Navigation Items */}
            <div className="flex flex-col items-center gap-2">
                {sidebarItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative w-full py-3 flex items-center justify-center group cursor-pointer"
                        onClick={() => handleNavigation(item.id, item.path)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        {/* Active Indicator */}
                        <div className={`absolute left-0 h-6 w-1 bg-[#34a853] rounded-r-full transition-transform duration-300 ${
                            activePage === item.id 
                                ? 'translate-y-0' 
                                : '-translate-y-2'
                        } ${hoveredItem === item.id ? 'opacity-30 scale-y-150' : ''}`} />

                        {/* Icon Container */}
                        <div className={`p-2 rounded-xl transition-all duration-300 ${
                            activePage === item.id
                                ? 'bg-[#34a853]/10 transform scale-110'
                                : 'hover:bg-gray-100'
                        }`}>
                            <img
                                src={item.icon}
                                alt={item.alt}
                                className={`w-8 h-8 transition-all duration-300 ${
                                    activePage === item.id 
                                        ? 'filter brightness-125 saturate-150' 
                                        : 'opacity-70 group-hover:opacity-100'
                                }`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Navigation Items */}
            <div className="flex flex-col items-center gap-4">
                {bottomItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative w-full py-2 flex items-center justify-center group cursor-pointer"
                        onClick={() => handleNavigation(item.id, item.path)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        {/* Active Indicator for Bottom Items */}
                        <div className={`absolute left-0 h-6 w-1 bg-[#34a853] rounded-r-full transition-transform duration-300 ${
                            activePage === item.id 
                                ? 'translate-y-0' 
                                : '-translate-y-2'
                        } ${hoveredItem === item.id ? 'opacity-30 scale-y-150' : ''}`} />

                        {/* Icon Container */}
                        <div className={`p-2 rounded-xl transition-all duration-300 ${
                            activePage === item.id
                                ? 'bg-[#34a853]/10 transform scale-110'
                                : 'hover:bg-gray-100'
                        } ${item.id === 6 ? 'mt-4' : ''}`}>
                            <img
                                src={item.icon}
                                alt={item.alt}
                                className={`w-8 h-8 transition-all duration-300 ${
                                    activePage === item.id 
                                        ? 'filter brightness-125 saturate-150' 
                                        : 'opacity-70 group-hover:opacity-100'
                                } ${item.id === 6 ? 'w-12 h-12 -m-1' : ''}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;