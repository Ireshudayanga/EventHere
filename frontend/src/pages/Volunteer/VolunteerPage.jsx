import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../redux/eventSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VolunteerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.events);
  const [volunteerEvents, setVolunteerEvents] = useState([]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    const filtered = events.filter(
      (event) => event.category?.toLowerCase() === "volunteer"
    );
    setVolunteerEvents(filtered);
  }, [events]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join our mission to make the world better. Browse local and remote volunteer
          opportunities and sign up to give back.
        </p>
      </motion.div>

      {/* Grid of Volunteer Events */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {volunteerEvents.map((event, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 p-6 h-full"
          >
            {/* Badge & Date */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                {event.category}
              </span>
              <span className="text-gray-400 text-sm">
                {new Date(event.date).toDateString()}
              </span>
            </div>

            {/* Title & Time */}
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-3">
                ⏰ <span>{event.time}</span>
              </p>
              <p className="text-sm text-gray-500">
                {/* You can use event.description if available */}
                {event.description.length > 100
                  ? `${event.description.substring(0, 100)}...`
                  : event.description}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <button
                onClick={() => navigate("/events")}
                className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 rounded-lg transition-all duration-200 shadow"
              >
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Don’t see your fit?
        </h2>
        <p className="text-gray-600 mb-5">
          We’re always adding new ways to get involved. Check the full event list or reach out to us!
        </p>
        <button
          onClick={() => navigate("/events")}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 rounded-lg transition-all duration-200 shadow"
        >
          Browse All Events
        </button>
      </motion.div>
    </div>
  );
};

export default VolunteerPage;
