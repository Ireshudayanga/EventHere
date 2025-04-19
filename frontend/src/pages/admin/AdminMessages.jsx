import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSocket } from "../../socket/SocketPrivider";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

const AdminMessages = () => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // 📥 Load all messages
  const loadMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin-messages");
      const all = res.data.reverse();

      setMessages(all);
      extractContacts(all);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Group messages by sender
  const extractContacts = (msgs) => {
    const users = {};
    msgs.forEach((msg) => {
      if (msg.email !== "admin") {
        users[msg.email] = msg.name || msg.email;
      }
    });

    const contactList = Object.keys(users).map((email) => {
      const name = users[email] || email; // fallback if name is undefined
      const initials = name
        ? name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "??";
      

      const userMessages = msgs.filter((m) => m.email === email);
      const lastMessage = userMessages[userMessages.length - 1];

      return {
        id: email,
        name,
        initials,
        lastMessage: lastMessage?.message || "",
      };
    });

    setContacts(contactList);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectedUser, messages]);

  useEffect(() => {
    if (!socket.current) return;

    const handleMessage = (msg) => {
      const isUserMessage = msg.receiverId === "admin" || msg.email === selectedUser?.id;

      if (isUserMessage) {
        setMessages((prev) => {
          const updated = [...prev, msg];
          extractContacts(updated);
          return updated;
        });

        if (msg.senderId === selectedUser?.id || msg.email === selectedUser?.id) {
          scrollToBottom();
        }
      }
    };

    socket.current.on("adminMessage", handleMessage);
    return () => socket.current.off("adminMessage", handleMessage);
  }, [socket, selectedUser]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const payload = {
      senderId: "admin",
      senderName: "Admin",
      receiverId: selectedUser.id,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.current.emit("adminMessage", payload);

    // Optimistically update UI
    setMessages((prev) => {
      const updated = [...prev, payload];
      extractContacts(updated);
      return updated;
    });

    setNewMessage("");
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.email === selectedUser?.id || // user -> admin
      (m.senderId === "admin" && m.receiverId === selectedUser?.id) // admin -> user
  );

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-[30%] bg-white border-r p-4 shadow-inner">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">User Messages</h2>
        {loading ? (
          <div className="flex justify-center pt-10">
            <ClipLoader color="#3B82F6" />
          </div>
        ) : contacts.length === 0 ? (
          <p className="text-gray-500">No users have messaged yet.</p>
        ) : (
          <div className="space-y-2 overflow-y-auto h-[85vh] custom-scrollbar">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedUser(contact)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  selectedUser?.id === contact.id ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              >
                <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold">
                  {contact.initials}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-500 truncate w-[180px]">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat window */}
      <div className="flex-1 bg-gray-50 p-4 flex flex-col relative">
        {selectedUser ? (
          <>
            <div className="border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Chat with {selectedUser.name}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {filteredMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.senderId === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-xs ${
                      msg.senderId === "admin"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-[10px] mt-1 text-right opacity-70">
                      {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            <div className="mt-4 flex gap-2 border-t pt-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 mt-20">Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
