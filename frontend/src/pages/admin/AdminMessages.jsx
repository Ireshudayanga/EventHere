import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSocket } from "../../socket/SocketPrivider";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();

  // Initial fetch
  const loadMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin-messages");
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to load messages", error);
      toast.error("Failed to fetch admin messages");
    }
  };

  useEffect(() => {
    loadMessages(); // Fetch once when mounted
  }, []);

  useEffect(() => {
    if (!socket?.current) return;

    // Avoid duplicates by checking _id
    const handleIncoming = (msg) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === msg._id);
        return exists ? prev : [msg, ...prev];
      });
    };

    const attachListeners = () => {
      socket.current.on("admin-message-receive", handleIncoming);
    };

    if (socket.current.connected) {
      attachListeners();
    } else {
      socket.current.on("connect", attachListeners);
    }

    return () => {
      socket.current?.off("admin-message-receive", handleIncoming);
      socket.current?.off("connect", attachListeners);
    };
  }, [socket]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Inbox (Admin)</h2>

      {messages.length === 0 ? (
        <p className="text-gray-400 text-sm">No messages yet</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} className="border p-4 mb-3 rounded-md shadow-sm">
            <p className="font-semibold">
              {msg.name} ({msg.email})
            </p>
            <p className="text-gray-700 mt-2">{msg.message}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminMessages;
