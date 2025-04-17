import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import { CalendarDays, Clock, Info } from 'lucide-react'; // Optional: using lucide-react for icons

const JoinEventPage = () => {
    const { state } = useLocation();
    const { title, date, time } = state || {};

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission here (e.g. call an API)
        alert("You’ve joined the event successfully!");
    };

    return (
        <div className="min-h-screen  flex items-center justify-center px-4 py-10">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 md:p-10 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Reserve Your Spot</h2>
                    <p className="text-sm text-gray-500 mt-1">Join the event by filling in your details</p>
                </div>

                {/* Event Details */}
                {title && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                            <Info className="w-4 h-4 text-blue-600" />
                            <span className="text-sm"><strong>Event:</strong> {title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <CalendarDays className="w-4 h-4 text-blue-600" />
                            <span className="text-sm"><strong>Date:</strong> {date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm"><strong>Time:</strong> {time}</span>
                        </div>
                    </div>
                )}

                {/* Join Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Full Name</label>
                        <input
                            type="text"
                            placeholder="Jane Doe"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Email Address</label>
                        <input
                            type="email"
                            placeholder="jane@example.com"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Phone </label>
                        <input
                            type="tel"
                            placeholder="+1 234 567 8901"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-blue-700 transition-all"
                    >
                        Join Event
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default JoinEventPage;
