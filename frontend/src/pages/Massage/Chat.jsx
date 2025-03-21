/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import socket from "../../utils/socket"; 
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Chat = () => {
  const axiosPublic = useAxiosPublic();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Initial fetch
    axiosPublic
      .get("/messages")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    // Listen for new messages
    socket.on("message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Clean up listener on unmount
    return () => socket.off("message");
  }, []); // ✅ Only run once on mount

  const sendMessage = () => {
    if (!message.trim() || !username.trim()) return;

    const newMessage = { sender: username, message };
    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-black font-bold mb-3">Chat Room</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter your name"
          className="border p-2 rounded w-full text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="h-64 overflow-y-auto bg-gray-100 p-2 rounded mb-3">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1 text-black">
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="border p-2 rounded flex-grow text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
