import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to load events", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:5000/events/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          });
          toast.success("Event deleted successfully");
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Failed to delete event", error);
      alert("Delete failed. Try again.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Event Manager</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border">Title</th>
                <th className="px-4 py-2 text-left border">Category</th>
                <th className="px-4 py-2 text-left border">Location</th>
                <th className="px-4 py-2 text-left border">Date</th>
                <th className="px-4 py-2 text-left border">Time</th>
                <th className="px-4 py-2 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{event.title}</td>
                  <td className="px-4 py-2 border">{event.category}</td>
                  <td className="px-4 py-2 border">
                    {event.location?.coordinates?.[1]},{" "}
                    {event.location?.coordinates?.[0]}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{event.time}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      title="Delete Event"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default EventManager;
