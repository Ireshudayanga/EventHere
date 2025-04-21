import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../redux/eventSlice";
import { fetchSpecialCategory } from "../../../redux/specialCategorySlice";
import Calender from "../../utils/Calender";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { events } = useSelector((state) => state.events);
  const { category } = useSelector((state) => state.specialCategory);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchSpecialCategory());
  }, [dispatch]);

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
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Event Calendar</h1>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categoryList.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full border ${
              selectedCategory === cat || (cat === "All" && !selectedCategory)
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
            onClick={() => setSelectedCategory(cat === "All" ? "" : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <Calender date={selectedDate} setDate={setSelectedDate} events={filteredEvents} />

      {/* Selected Events */}
      <div className="mt-6">
        {selectedDate ? (
          matchedEvents.length ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Events on {new Date(selectedDate).toDateString()}
              </h2>
              {matchedEvents.map((event, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg p-4 mb-3 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.category}</p>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                  <Button
                    onClick={() => navigate("/events")}
                    size="sm"
                    color="bg-blue-600"
                  >
                    View More
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No events on this date.</p>
          )
        ) : (
          <p className="text-gray-400">Select a date to see events.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
