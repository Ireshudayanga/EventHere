import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import { CalendarDays, Clock, Info } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { joinEvent } from '../../redux/joinEventSlice';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';


const JoinEventPage = () => {
    const { currentUser } = useContext(AuthContext)
    const { state } = useLocation();
    const { title, date, time , eventid } = state || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.joinEvent);

    const userEmail = currentUser?.email || "";


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const payload = {
          ...data,
          title,
          date,
          time,
          eventid,
        };
      
        try {
          const result = await dispatch(joinEvent(payload)).unwrap(); // ✅ use unwrap
          toast.success("Successfully joined the event!");
          reset();
          setTimeout(() => navigate("/events"), 2000);
        } catch (err) {
          console.error("Join failed:", err);
          toast.error(err?.message || "Failed to join the event.");
        }
      };
      

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Full Name</label>
                        <input
                            type="text"
                            placeholder="Jane Doe"
                            {...register("name", { required: "Name is required" })}
                            className="w-full  text-gray-700 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Email Address</label>
                        <input
                            type="email"
                            {...register("email")}
                            defaultValue={userEmail}
                            readOnly
                            className="w-full text-gray-700 px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none cursor-not-allowed"
                        />

                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Phone</label>
                        <input
                            type="tel"
                            placeholder="+1 234 567 8901"
                            {...register("phone", {
                                pattern: {
                                    value: /^[0-9+\s()-]*$/,
                                    message: "Invalid phone number",
                                },
                            })}
                            className="w-full  text-gray-700 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Submitting..." : "Join Event"}
                    </Button>

                
                    {status === "failed" && (
                        <p className="text-red-500 text-sm text-center mt-2">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default JoinEventPage;
