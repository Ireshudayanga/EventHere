import React, { useContext, useState } from 'react';
import { Mail } from 'lucide-react';
import { AuthContext } from '../../context/AuthProvider';
import { ClipLoader } from 'react-spinners';
import { calculateUserRating } from '../../utils/calculateUserRating';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchEvents } from '../../../redux/eventSlice'; // ✅ adjust path
import { Pencil, Trash2 } from "lucide-react";
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { fetchJoinedEvents } from '../../../redux/joinEventSlice';
import { fetchParticipantsByEventId } from '../../../redux/joinEventSlice';



export default function ModernUserProfile() {
    const axiosSecure = useAxiosSecure();
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.events);
    const { joinedEvents, participantsByEventId } = useSelector((state) => state.joinEvent);
    const { currentUser, loading } = useContext(AuthContext);

    const hostedEvents = events.filter((event) => event.userEmail === currentUser?.email);
    const [activeTab, setActiveTab] = useState('Host Events');

    useEffect(() => {
        if (currentUser?.email) {
            dispatch(fetchEvents()).then((res) => {
                const hosted = res.payload.filter((event) => event.userEmail === currentUser.email);
                hosted.forEach((e) => dispatch(fetchParticipantsByEventId(e._id)));
            });
            dispatch(fetchJoinedEvents(currentUser.email));
        }
    }, [dispatch, currentUser]);

    const userRating = calculateUserRating({
        reviews: [4, 5, 5, 3, 4, 5, 5],
        activityScore: 3.5,
        profileCompleted: !!currentUser?.displayName && !!currentUser?.photoURL,
    });

    const tabStyle = (tab) =>
        `pb-2 transition-all duration-200 ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-400 hover:text-blue-600'
        }`;

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-gray-100">
                <ClipLoader size={40} color="#3498db" />
            </div>
        );
    }

    const handleDeleteEvent = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this event?");
        if (!confirm) return;

        try {
            const res = await axiosSecure.delete(`/events/${id}`);
            if (res.status === 200) {
                toast.success("Event deleted successfully!");
                dispatch(fetchEvents());
            } else {
                toast.error("⚠️ Failed to delete event!");
            }
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("🚨 Error deleting event!");
        }
    };

    return (
        <div className="h-full md:h-screen p-6 flex justify-center">
            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-3">
                {/* Left Side */}
                <div className="bg-white p-6 border-r">
                    <div className="flex flex-col items-center">
                        <img
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                currentUser.displayName
                            )}&backgroundColor=0D8ABC&textColor=ffffff&radius=50&size=128`}
                            alt="User Avatar"
                            className="rounded-full w-32 h-32 border-4 border-blue-500 shadow-lg"
                        />
                        <h2 className="text-xl text-gray-700 font-bold mt-4">{currentUser.displayName}</h2>
                        <div className="flex text-gray-500 mt-2 items-center gap-2 text-sm">
                            <Mail size={16} /> {currentUser.email}
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="col-span-2 p-6 flex flex-col">
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center mb-6">
                        <div>
                            <p className="text-sm text-gray-400">Rating</p>
                            <p className="text-lg font-bold text-blue-600">
                                {userRating} <span className="text-yellow-400">★★★★★</span>
                            </p>
                        </div>
                        <div className="flex gap-2 mt-3 md:mt-0">
                            <a
                                href="mailto:ireshudayanga23976@gmail.com?subject=Issue%20Report&body=Hello..."
                                className="inline-block text-sm px-3 py-1 rounded-md border border-red-500 text-red-500 hover:bg-red-100 transition"
                            >
                                Report Problem
                            </a>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b mb-6 flex gap-6 text-sm">
                        <button className={tabStyle('Host Events')} onClick={() => setActiveTab('Host Events')}>Host Events</button>
                        <button className={tabStyle('Mark as Going')} onClick={() => setActiveTab('Mark as Going')}>Mark as Going</button>
                    </div>

                    {/* Animated Content */}
                    <div className="relative h-full min-h-[200px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'Host Events' && (
                                <motion.div
                                    key="host"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Hosted Events</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                            {hostedEvents.map((event) => (
                                                <div key={event._id} className="relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                    <div className="absolute top-3 right-3 flex gap-2">
                                                        <Link to="/edit-event" state={event} className="text-blue-600 hover:text-blue-800 transition">
                                                            <Pencil className="w-5 h-5" />
                                                        </Link>
                                                        <button className="text-red-500 hover:text-red-700 transition" onClick={() => handleDeleteEvent(event._id)}>
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <div className="mb-2 mt-1">
                                                        <h4 className="text-xl font-semibold text-gray-800 truncate">{event.title}</h4>
                                                        <p className="text-sm text-gray-500">{event.category || 'Uncategorized'}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                                                        <span>📅 {event.date}</span>
                                                        <span>⏰ {event.time}</span>
                                                    </div>
                                                    <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                                        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">Hosted</span>
                                                        <span>{participantsByEventId[event._id] || 0} participants</span>
                                                    </div>
                                                    {participantsByEventId[event._id] === 0  && event.category === 'volunteer' && (
                                                        <div className="mt-3 p-2 text-xs bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded">
                                                          No participants yet. Volunteers can sign up if this event is marked as &quot;Sign-Up Required&quot;.
                                                        </div>
                                                    )}

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'Mark as Going' && (
                                <motion.div
                                    key="going"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Events You&apos;ve Joined</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                            {joinedEvents.length > 0 ? (
                                                joinedEvents.map((event) => {
                                                    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                                                        year: 'numeric', month: 'long', day: 'numeric'
                                                    });
                                                    return (
                                                        <div key={event._id} className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
                                                            <h4 className="text-lg md:text-xl font-semibold text-gray-800">{event.title}</h4>
                                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                                                                <span className="flex items-center gap-1">📅 <span>{formattedDate}</span></span>
                                                                <span className="flex items-center gap-1">⏰ <span>{event.time}</span></span>
                                                            </div>
                                                            <div className="mt-4 flex justify-end">
                                                                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Joined</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-gray-500">You haven’t joined any events yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
