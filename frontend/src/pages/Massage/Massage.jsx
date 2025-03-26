import React, { useState, useRef, useEffect, useContext } from "react";
import SearchBar from "../../components/SearchBar";
import { Send, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import axios from "axios";
import "../Massage/Message.css";
import { AuthContext } from "../../context/AuthProvider";
import { ClipLoader } from "react-spinners";

const Massage = () => {
  
  const { currentUser, loading } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);

  const messagesEndRef = useRef(null);
  const socket = useRef(null);
  const currentUserId = currentUser?.email || "";

  const loadMessagesFromLocal = (contactId) => {
    const key = `chat:${contactId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };
  
  const saveMessagesToLocal = (contactId, messages) => {
    const last100 = messages.slice(-100);
    localStorage.setItem(`chat:${contactId}`, JSON.stringify(last100));
  };
  

  useEffect(() => {
    if (!currentUserId) return;

    socket.current = io("http://localhost:5000");
    socket.current.emit("join", currentUserId);

    socket.current.on("privateMessage", (msg) => {
      // 👇 Prevent handling message we already added manually
      if (msg.senderId === currentUserId) return;
    
      const contactId = msg.senderId;
      const newMsg = {
        text: msg.message,
        sender: "bot",
        timestamp: Date.now(),
      };
    
      const old = loadMessagesFromLocal(contactId);
      const updated = [...old, newMsg];
      saveMessagesToLocal(contactId, updated);
    
      const isCurrentChat = selectedChat?.id === contactId;
    
      if (isCurrentChat) {
        setMessages((prevMessages) => [...prevMessages, newMsg]);
      }
    
      fetchContacts();
    });
    
    
    

    fetchContacts();

    return () => {
      socket.current.disconnect();
    };
  }, [selectedChat, currentUserId]);

  const fetchContacts = () => {
    const local = localStorage.getItem(`chat-contacts:${currentUserId}`);
    if (local) {
      setContacts(JSON.parse(local));
    } else {
      setContacts([]);
    }
  };
  

  const loadMessages = (contact) => {
    const localMsgs = loadMessagesFromLocal(contact.id);
    setMessages(localMsgs);
  };
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!input.trim() || !selectedChat) return;
  
    const newMsg = {
      text: input.trim(),
      sender: "user",
      timestamp: Date.now(),
    };
  
    const updated = [...messages, newMsg];
    setMessages(updated);
    saveMessagesToLocal(selectedChat.id, updated);
    setInput("");
  
    // Still emit to socket
    socket.current.emit("privateMessage", {
      senderId: currentUserId,
      receiverId: selectedChat.id.toString(),
      message: newMsg.text,
    });
  };
  

  return (
    <div className="h-screen w-full">
      {/* 👇 Handle loading or auth failure inside JSX, not before hooks */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color="#3B82F6" />
        </div>
      ) : !currentUser ? (
        <div className="text-center p-10">You must be logged in to view messages.</div>
      ) : (
        <>
          <SearchBar title="Messages" />
          <div className="h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl md:shadow-2xl ml-auto">
            <div className="flex h-full p-3 md:p-7 gap-4 md:gap-4">
              {/* Chat List */}
              {!showChat && (
                <div className="bg-white w-full md:w-[30%] rounded-xl md:rounded-2xl shadow-lg p-5">
                  <p className="text-2xl font-medium font-sans text-black p-3">Messages</p>
                  <div className="overflow-y-auto scrollbar-hide">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
                        onClick={async () => {
                          setSelectedChat(contact);
                          if (window.innerWidth < 768) setShowChat(true);
                          await loadMessages(contact);
                        }}
                      >
                        <img src={contact.img} alt={contact.name} className="w-10 h-10 object-contain rounded-full" />
                        <div>
                          <p className="text-lg font-medium text-black">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.lastMessage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat View - Mobile */}
              {showChat && selectedChat && (
                <div className="bg-white w-full md:flex rounded-xl md:rounded-2xl shadow-lg flex flex-col h-full flex-grow">
                  <div className="p-3 flex items-center gap-3 border-b">
                    <button onClick={() => setShowChat(false)} className="text-gray-600">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <img src={selectedChat.img} alt={selectedChat.name} className="w-10 h-10 object-contain rounded-full" />
                    <p className="text-lg text-black font-medium">{selectedChat.name}</p>
                  </div>

                  <div className="flex-1 overflow-y-auto scrollbar-hide p-8 space-y-4">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`p-3 rounded-2xl max-w-xs ${
                            msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef}></div>
                  </div>

                  <div className="p-4 flex items-center gap-2 border-t">
                    <input
                      type="text"
                      className="flex-1 p-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600" onClick={sendMessage}>
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Chat View - Desktop */}
              <div className="hidden md:flex bg-white flex-1 rounded-xl md:rounded-2xl shadow-lg flex-col h-full">
                {selectedChat ? (
                  <>
                    <div className="flex-1 overflow-y-auto scrollbar-hide p-8 space-y-4">
                      {messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`p-3 rounded-2xl max-w-xs ${
                              msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef}></div>
                    </div>
                    <div className="p-4 flex items-center gap-2 border-t">
                      <input
                        type="text"
                        className="flex-1 p-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      />
                      <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600" onClick={sendMessage}>
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-500 p-10">Select a chat to start messaging.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Massage;
