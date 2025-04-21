import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSocket } from "../../socket/SocketPrivider";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AdminChat = () => {
  const { socket } = useSocket();
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  // Fetch all messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin-messages");
        const data = res.data.reverse().map((msg) => ({
          ...msg,
          senderId: msg.email,
          senderName: msg.name,
          timestamp: msg.timestamp || msg.createdAt,
        }));
        setMessages(data);
        extractContacts(data);
        console.log("🧾 Normalized messages:", data);
      } catch (err) {
        toast.error("Failed to fetch messages");
      }
    };
    fetchMessages();
  }, []);

  // Join admin room on socket connect
  useEffect(() => {
    if (!socket.current) return;
    socket.current.emit("join", "admin");

    const handleNewMessage = (msg) => {
      
      toast.warn(`New message from ${msg.senderName} To Admin`);

      setMessages((prev) => {
        const updated = [...prev, msg];
        extractContacts(updated);
        return updated;
      });

      const isChattingWithUser = selectedUser &&
        (msg.senderId === selectedUser.id || msg.receiverId === selectedUser.id);

      if (isChattingWithUser) {
        scrollToBottom();
        setSelectedUser({ ...selectedUser }); // force re-render
      }

    
    };

    socket.current.on("adminMessage", handleNewMessage);
    return () => socket.current.off("adminMessage", handleNewMessage);
  }, [socket, selectedUser]);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Extract unique contacts
  const extractContacts = (msgs) => {
    const usersMap = {};
    msgs.forEach((msg) => {
      const id = msg.email === "admin" ? msg.receiverId : msg.email;
      if (!id || id === "admin") return;
      const name = msg.name || msg.senderName || id;
      usersMap[id] = name;
    });

    const contactsList = Object.entries(usersMap).map(([id, name]) => ({
      id,
      name,
      initials: name.split(" ").map(w => w[0]).join("").toUpperCase(),
    }));
    setContacts(contactsList);
  };

  const sendMessage = () => {
    if (!messageInput.trim() || !selectedUser) return;
  
    const msg = {
      senderId: "admin",
      senderName: "Admin",
      email: "admin",
      receiverId: selectedUser.id,
      message: messageInput.trim(),
      timestamp: new Date().toISOString(),
    };
  
    socket.current.emit("adminMessage", msg); // only emit
    setMessageInput(""); // clear input
  };
  

  const filteredMessages = useMemo(() => {
    if (!selectedUser) return [];
    return messages.filter(
      (m) =>
        (m.senderId === selectedUser.id && m.receiverId === "admin") ||
        (m.senderId === "admin" && m.receiverId === selectedUser.id)
    );
  }, [messages, selectedUser]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/3 bg-white border-r overflow-y-auto">
        <h2 className="text-xl font-bold p-4">User Messages</h2>
        {contacts.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`cursor-pointer p-3 border-b hover:bg-gray-100 ${selectedUser?.id === user.id ? "bg-blue-100" : ""}`}
          >
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.id}</div>
          </div>
        ))}
      </aside>

      {/* Chat Box */}
      <main className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <header className="p-4 border-b">
              <h3 className="text-lg font-semibold">Chat with {selectedUser.name}</h3>
            </header>

            <section className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredMessages.map((msg, i) => {
                const isAdmin = msg.senderId === "admin";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`p-3 rounded-lg max-w-sm ${isAdmin ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                      <p>{msg.message}</p>
                      <p className="text-xs opacity-70 text-right mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef}></div>
            </section>

            <footer className="p-4 border-t flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded-full px-4 py-2"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                className="bg-blue-600 text-white px-4 rounded-full"
                onClick={sendMessage}
              >
                Send
              </button>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminChat;
