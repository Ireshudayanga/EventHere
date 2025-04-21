import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../redux/eventSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categoryColorMap = {
  entertainment: "bg-green-100 text-green-800",
  volunteer: "bg-yellow-100 text-yellow-800",
  traditional: "bg-blue-100 text-blue-800",
  default: "bg-gray-100 text-gray-800",
};

const ExplorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const featured = useMemo(() => events.slice(0, 3), [events]);
  const latest = useMemo(() => events.slice(-5).reverse(), [events]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Explore & Discover</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          Dive into upcoming events, discover unique experiences, and connect with the community.
        </p>
        <button
          onClick={() => navigate("/events")}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow"
        >
          Browse All Events
        </button>
      </motion.div>

     

      {/* Featured Events */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">✨ Featured</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((event, i) => (
            <div
              key={i}
              className="flex flex-col justify-between h-full bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${categoryColorMap[event.category?.toLowerCase()] || categoryColorMap.default}`}
                  >
                    {event.category}
                  </span>
                  <span className="text-sm text-gray-400">{new Date(event.date).toDateString()}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-500 mt-2">⏰ {event.time}</p>
              </div>
              <button
                onClick={() => navigate("/events")}
                className="mt-5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Events List */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">🆕 Latest</h2>
        <div className="space-y-4">
          {latest.map((event, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <h4 className="font-semibold text-gray-800">{event.title}</h4>
                <p className="text-sm text-gray-500">
                  {event.time} • {new Date(event.date).toDateString()}
                </p>
              </div>
              <button
                onClick={() => navigate("/events")}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Explore →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Want more?</h3>
        <p className="text-gray-600 mb-4">
          We’re adding new events every week. Jump into the full list now.
        </p>
        <button
          onClick={() => navigate("/events")}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow"
        >
          View All Events
        </button>
      </motion.div>
    </div>
  );
};

export default ExplorePage;
