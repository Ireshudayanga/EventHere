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
    const navigate = useNavigate(); 

    const sidebarItems = [
        { id: 1, icon: Sidebar01, alt: "Dashboard", size: "w-8", path: "/events" },
        { id: 2, icon: Sidebar02, alt: "Share Ride", size: "w-8", path: "/share-ride" },
        { id: 3, icon: Sidebar03, alt: "Message", size: "w-8", path: "/message" },
        { id: 4, icon: Sidebar04, alt: "Add Events", size: "w-8", path: "/add-events" },
    ];

    const bottomItems = [
        { id: 5, icon: Sidebar05, alt: "Profile", size: "w-8", path: "/profile" },
        { id: 6, icon: Sidebar06, alt: "Back", size: "w-10", path: "/back" },
    ];

    const handleNavigation = (id, path) => {
        setActivePage(id);
        navigate(path); 
    };

    return (
        <div className="h-[90%] flex flex-col absolute top-28 gap-9 justify-between shadow-lg">
            <div className="h-[90%] flex flex-col items-center justify-center gap-6 relative">
                {sidebarItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative flex items-center justify-center cursor-pointer"
                        onClick={() => handleNavigation(item.id, item.path)}
                    >
                        {/* Active Indicator */}
                        <div
                            className={`absolute bottom-2 w-8 h-[100%]  bg-[#34a85380] transition-opacity duration-300 ${
                                activePage === item.id ? "opacity-100" : "opacity-0"
                            }`}
                        />
                        {/* Sidebar Icon */}
                        <img
                            className={`${item.size} mb-6 ${
                                activePage === item.id ? "brightness-125" : "brightness-75"
                            } transition-all duration-300`}
                            src={item.icon}
                            alt={item.alt}
                        />
                    </div>
                ))}
            </div>
            <div className="h-[10%] flex flex-col items-center justify-center gap-4">
                {bottomItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative flex items-center justify-center cursor-pointer"
                        onClick={() => handleNavigation(item.id, item.path)}
                    >
                        {/* Active Indicator */}
                        <div
                            className={`absolute bottom-2 w-8 h-[100%] rounded-3xl bg-[#34a85380] transition-opacity duration-300 ${
                                activePage === item.id ? "opacity-100" : "opacity-0"
                            }`}
                        />
                        {/* Sidebar Icon */}
                        <img
                            className={`${item.size} mb-6 ${
                                activePage === item.id ? "brightness-125" : "brightness-75"
                            } transition-all duration-300`}
                            src={item.icon}
                            alt={item.alt}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
