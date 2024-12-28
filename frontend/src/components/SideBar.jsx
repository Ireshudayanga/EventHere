import React from 'react';
import Sidebar01 from '../assets/svg/Sidebar01.svg';
import Sidebar02 from '../assets/svg/Sidebar02.svg';
import Sidebar03 from '../assets/svg/Sidebar03.svg';
import Sidebar04 from '../assets/svg/Sidebar04.svg';
import Sidebar05 from '../assets/svg/Sidebar05.svg';
import Sidebar06 from '../assets/svg/Sidebar06.svg';

const SideBar = () => {
    return (
        <div className="h-[90%] flex flex-col absolute top-28 gap-9 justify-between  shadow-lg">
            <div className=' h-[90%]  flex flex-col items-center justify-center gap-6'>
                <img className="w-8 mb-6" src={Sidebar01} alt="Dashboard" />
                <img className="w-8 mb-6" src={Sidebar02} alt="Analytics" />
                <img className="w-8 mb-6" src={Sidebar03} alt="Reports" />
                <img className="w-8 mb-6" src={Sidebar04} alt="Settings" />
            </div>
            <div className=' h-[10%] flex flex-col items-center justify-center '>
                <img className="w-8 mb-6" src={Sidebar05} alt="Profile" />
                <img className="w-10 mb-6" src={Sidebar06} alt="Support" />
            </div>
        </div>
    );
};

export default SideBar;
