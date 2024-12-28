import React from 'react';
import home from '../../assets/svg/Home.svg';
import SearchBar from './SearchBar';
import userIcon from '../../assets/svg/User.svg';
import '../Event/Event.css';

const EventPage = () => {
    return (
        <div className="h-screen">
            {/* Top Navigation */}
            <div className="flex flex-row py-4 px-8 justify-between items-center">
                <img src={home} alt="home" className="w-8 h-8" />
                <SearchBar />
                <div className="flex flex-row items-center gap-4">
                    <img className="w-8" src={userIcon} alt="user icon" />
                    <p className="text-black">John Doe</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-[#d4d3d3] h-[92%] w-[94%] mt-4 rounded-2xl shadow-md ml-auto">
                {/* Main Layout */}
                <div className="flex h-full p-7">

                    {/* Left Section */}
                    <div className="w-[25%] h-full flex flex-col gap-5">
                        <div className="bg-white text-black p-5 rounded-2xl h-[35%] shadow-lg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptates.
                        </div>
                        <div className="bg-white text-black p-5 rounded-2xl h-[65%] shadow-lg">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptates.
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-[75%] h-full text-zinc-950 flex flex-col pl-6">
                        <div className="h-2/3 overflow-y-auto">
                            <div className="bg-white text-black p-5 rounded-2xl h-[100%] shadow-lg">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptates.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. A, iusto harum. Quaerat ad accusamus nemo quis nihil aliquid deserunt voluptatum! Minus ut harum quasi aperiam atque laudantium optio aut cumque.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio eius labore non odit? Iusto laborum fugiat deserunt qui obcaecati reiciendis doloremque quisquam dolores quia nemo perferendis quod, assumenda inventore possimus?
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis nostrum voluptates hic molestiae. Perspiciatis sit in laboriosam minima aliquam debitis, culpa fugit vitae voluptatum consequuntur ut eligendi molestias quae odit.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, ab. Vel magni repellendus voluptatem sed, ipsa deleniti provident eos numquam? Maxime nesciunt iure facilis est fugiat natus nam praesentium cum.
                            </div>
                        </div>
                        <div className="flex gap-3 justify-between pt-5 h-1/3">
                            <div className="bg-white text-black rounded-2xl w-1/3 h-[100%] p-4 shadow-lg">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam maxime.
                                lorem lorem
                            </div>
                            <div className="bg-white text-black rounded-2xl w-1/3 h-[100%] p-4 shadow-lg">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam maxime.
                            </div>
                            <div className="bg-white text-black rounded-2xl w-1/3 h-[100%] p-4 shadow-lg">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam maxime.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EventPage;
