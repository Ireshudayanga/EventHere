import React, { useState, useRef, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import { Send } from "lucide-react";
import { motion } from "framer-motion";

const Massage = () => {
    const contacts = [
        { id: 1, name: "John Doe", lastMessage: "Hey! How are you?", img: "https://i.pravatar.cc/40?img=1" },
        { id: 2, name: "Sarah Smith", lastMessage: "Let's meet tomorrow!", img: "https://i.pravatar.cc/40?img=2" }
    ];

    const [selectedChat, setSelectedChat] = useState(contacts[0]);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", sender: "bot" },
    ]);
    const [input, setInput] = useState("");

    // Create a reference for the message container
    const messagesEndRef = useRef(null);

    // Function to scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll to bottom when messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            <SearchBar />
            <div className="h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl shadow-xl md:shadow-2xl ml-auto">
                <div className="flex md:flex-row h-full p-3 md:p-7 gap-4 md:gap-4">
                    <div className="bg-white w-[30%] rounded-xl md:rounded-2xl shadow-lg p-5 ">
                        <div className="flex flex-col h-full">
                            <p className="text-2xl font-medium font-sans text-black p-3">Messages</p>
                            <div className="overflow-y-auto scrollbar-hide">
                                {contacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        className={`flex items-center gap-3 p-3 cursor-pointer ${selectedChat.id === contact.id ? "bg-gray-100" : ""}`}
                                        onClick={() => setSelectedChat(contact)}
                                    >
                                        <img src={contact.img} alt={contact.name} className="w-10 h-10 object-contain rounded-full" />
                                        <div>
                                            <p className="text-lg font-medium text-gray-800">{contact.name}</p>
                                            <p className="text-sm text-gray-600">{contact.lastMessage}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chat Section */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg flex flex-col h-full flex-grow">
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
                            {/* Empty div to keep track of the last message */}
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

                </div>
            </div>
        </div>
    );
};

export default Massage;
