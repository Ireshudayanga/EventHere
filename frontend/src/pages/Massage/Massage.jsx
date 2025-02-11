import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import { Send, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const Massage = () => {
  const contacts = [
    { id: 1, name: "John Doe", lastMessage: "Hey! How are you?", img: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Sarah Smith", lastMessage: "Let's meet tomorrow!", img: "https://i.pravatar.cc/40?img=2" }
  ];

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you today?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false); // Controls mobile view

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "I'm here to help! 😊", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="h-screen w-full">
      <SearchBar title="Messages" />
      <div className="h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl md:shadow-2xl ml-auto">
        <div className="flex h-full p-3 md:p-7 gap-4 md:gap-4">
          {/* Chat List - Shown by default on mobile */}
          {!showChat && (
            <div className="bg-white w-full md:w-[30%] rounded-xl md:rounded-2xl shadow-lg p-5">
              <p className="text-2xl font-medium font-sans text-black p-3">Messages</p>
              <div className="overflow-y-auto scrollbar-hide">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedChat(contact);
                      if (window.innerWidth < 768) setShowChat(true); 
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

          {/* Chat Section - Shown when a chat is selected on mobile */}
          {showChat && selectedChat && (
            <div className="bg-white w-full md:flex rounded-xl md:rounded-2xl shadow-lg flex flex-col h-full flex-grow">
              {/* Back button for mobile */}
              <div className="p-3 flex items-center gap-3 border-b">
                <button onClick={() => setShowChat(false)} className="text-gray-600">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <img src={selectedChat.img} alt={selectedChat.name} className="w-10 h-10 object-contain rounded-full" />
                <p className="text-lg text-black font-medium">{selectedChat.name}</p>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-8 space-y-4" style={{ scrollBehavior: "smooth" }}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`p-3 rounded-2xl max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef}></div>
              </div>

              {/* Input Field */}
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

          {/* Chat Section - Always visible on desktop */}
          <div className="hidden md:flex bg-white flex-1 rounded-xl md:rounded-2xl shadow-lg flex-col h-full">
            {selectedChat ? (
              <>
                <div className="flex-1 overflow-y-auto scrollbar-hide p-8 space-y-4" style={{ scrollBehavior: "smooth" }}>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`p-3 rounded-2xl max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
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
    </div>
  );
};

export default Massage;
