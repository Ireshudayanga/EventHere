import React, { useContext } from 'react';
import { Mail, Phone, MapPin, Globe, Calendar, User } from 'lucide-react';
import { AuthContext } from '../../context/AuthProvider';
import { ClipLoader } from 'react-spinners';
import { calculateUserRating } from '../../utils/calculateUserRating';


export default function ModernUserProfile() {
    const { currentUser, loading } = useContext(AuthContext);

     // Sample values — in real usage, these would come from your backend or DB
  const userRating = calculateUserRating({
    reviews: [4, 5, 5, 3, 4 , 5,5],         // Example user ratings
    activityScore: 3.5,               // Custom metric (0-10)
    profileCompleted: !!currentUser?.displayName && !!currentUser?.photoURL
  });


    return (
        (loading ? (<div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-gray-100">
            <ClipLoader size={40} color={"#3498db"} loading={true} />
        </div>) : (<div className="h-full md:h-screen p-6 flex justify-center ">
            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-3">
                {/* Left Panel */}
                <div className="bg-white p-6 border-r">
                    <div className="flex flex-col items-center">
                        <img
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.displayName)}&backgroundColor=0D8ABC&textColor=ffffff&radius=50&size=128`}
                            alt="User Avatar"
                            className="rounded-full w-32 h-32 border-4 border-blue-500 shadow-lg"
                        />


                        <h2 className="text-xl text-gray-500 uppercase font-semibold mt-4">{currentUser.displayName}</h2>
                        <div className="flex text-gray-500 m-1 items-center gap-2">
                            <Mail size={16} /> {currentUser.email}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="col-span-2 p-6">
                    {/* Header Row */}
                    <div className="flex flex-wrap justify-between items-center mb-6">
                        <div>
                            <p className="text-sm text-gray-400">Rating</p>
                            <p className="text-lg font-bold text-blue-600">{userRating} <span className='yellow-color'>★★★★★</span></p>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                            <button className="text-sm px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                                ✔ Contacts
                            </button>
                            <button className="text-sm px-3 py-1 rounded-md border border-red-500 text-red-500 hover:bg-red-100">
                                Report Problem
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b mb-6 flex gap-6 text-sm">
                        <button className="pb-2 border-b-2 border-blue-500 text-blue-600 font-medium">Timeline</button>
                        <button className="pb-2 text-gray-400 hover:text-blue-500 transition">About</button>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <Phone size={16} /> +1 234 567 890
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} /> 342 E 85th Street, NY 10028
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} /> hello@marquatech.com
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe size={16} /> www.marquatech.com
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="mt-6 space-y-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} /> Birthday: Dec 25, 2000
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={16} /> Gender: Male
                        </div>
                    </div>
                </div>
            </div>
        </div>)))
}
;

