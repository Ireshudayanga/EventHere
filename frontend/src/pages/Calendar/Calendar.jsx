import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../redux/eventSlice";
import { fetchSpecialCategory } from "../../../redux/specialCategorySlice";
import Calender from "../../utils/Calender";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Category Color Map
const categoryColorMap = {
  entertainment: {
    bg: "bg-green-500",
    text: "text-white",
    ring: "ring-green-600",
    pill: "bg-green-100 text-green-800",
  },
  volunteer: {
    bg: "bg-yellow-400",
    text: "text-black",
    ring: "ring-yellow-500",
    pill: "bg-yellow-100 text-yellow-800",
  },
  traditional: {
    bg: "bg-blue-500",
    text: "text-white",
    ring: "ring-blue-600",
    pill: "bg-blue-100 text-blue-800",
  },
  default: {
    bg: "bg-gray-200",
    text: "text-gray-800",
    ring: "ring-gray-400",
    pill: "bg-gray-100 text-gray-800",
  },
};

const CalendarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { events } = useSelector((state) => state.events);
  const { category } = useSelector((state) => state.specialCategory);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchSpecialCategory());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const trigger = 400;
      setShowStickyCTA(scrollY > trigger);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryList = useMemo(() => {
    const unique = new Set(events.map((e) => e.category));
    return ["All", ...unique];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") return events;
    return events.filter((e) => e.category === selectedCategory);
  }, [events, selectedCategory]);

  const matchedEvents = useMemo(() => {
    if (!selectedDate) return [];
    const selectedStr = new Date(selectedDate).toDateString();
    return filteredEvents.filter((e) => {
      const eventDate = new Date(e.date).toDateString();
      return eventDate === selectedStr;
    });
  }, [filteredEvents, selectedDate]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 relative">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">📅 Event Calendar</h1>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categoryList.map((cat) => {
          const isAll = cat === "All";
          const isSelected = selectedCategory === cat || (isAll && !selectedCategory);
          const colorKey = cat.toLowerCase();
          const colorSet = categoryColorMap[colorKey] || categoryColorMap.default;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(isAll ? "" : cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-150 border
                ${
                  isSelected
                    ? `${colorSet.bg} ${colorSet.text} ${colorSet.ring} ring-2`
                    : `${colorSet.pill} hover:opacity-90 border-transparent`
                }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Calendar */}
      <div className="bg-white border border-gray-200 shadow rounded-xl p-5 mb-10">
        <Calender date={selectedDate} setDate={setSelectedDate} events={filteredEvents} />
      </div>

      {/* Events */}
      <div>
        {selectedDate ? (
          matchedEvents.length ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Events on {new Date(selectedDate).toDateString()}
              </h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedEvents.map((event, i) => {
                  const colorSet =
                    categoryColorMap[event.category.toLowerCase()] || categoryColorMap.default;

                  return (
                    <div
                    key={i}
                    className="flex flex-col justify-between bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 h-full"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                        <span
                          className={`px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${colorSet.pill}`}
                        >
                          {event.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                        ⏰ <span>{event.time}</span>
                      </p>
                    </div>
                  
                    <button
                      onClick={() => navigate("/events")}
                      className="mt-auto inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 rounded-lg transition-all duration-200 shadow-sm"
                    >
                      View Details
                    </button>
                  </div>
                  
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg mt-6">No events on this date.</p>
          )
        ) : (
          <p className="text-center text-gray-500 text-lg">Select a date to see events.</p>
        )}
      </div>

      {/* Animated Motivational CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          Want to explore more events?
        </h3>
        <p className="text-gray-600 mb-4">
          Discover exciting upcoming events beyond your selected date.
        </p>
        <button
          onClick={() => navigate("/events")}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 rounded-lg transition-all duration-200 shadow"
        >
          Browse All Events
        </button>
      </motion.div>

      {/* Event Total Summary + Link */}
      <div className="mt-10 text-center">
        <p className="text-gray-500">
          There are{" "}
          <span className="font-semibold text-blue-600">{events.length}</span> events happening
          across all categories.
          <button
            onClick={() => navigate("/events")}
            className="text-blue-600 font-medium hover:underline ml-1"
          >
            See them all →
          </button>
        </p>
      </div>

      {/* Sticky CTA */}
      {showStickyCTA && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-0 right-0 px-4 z-50"
        >
          <div className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-xl rounded-xl flex items-center justify-between px-5 py-3">
            <span className="text-sm text-gray-700">Explore more events and join the fun.</span>
            <button
              onClick={() => navigate("/events")}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Go to Events
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CalendarPage;
