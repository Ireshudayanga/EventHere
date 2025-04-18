import React, { useState, useRef, useEffect, useContext } from "react";
import SearchBar from "../../components/SearchBar";
import { Send, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import "../Massage/Message.css";
import { AuthContext } from "../../context/AuthProvider";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSocket } from "../../socket/SocketPrivider";

const Massage = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const currentUserId = currentUser?.email || "";
  const { socket, setHasUnreadMessages } = useSocket();

  useEffect(() => {
    setHasUnreadMessages(false);
    if (!currentUserId) return;
    fetchContacts();
  }, [selectedChat, currentUserId]);

  const fetchContacts = () => {
    const chats = Object.keys(localStorage).filter((key) =>
      key.startsWith(`chat_${currentUserId}_`)
    );

    const contactIds = chats.map(key => key.split("_")[2]);

    const mapped = contactIds.map((id) => {
      const messages = JSON.parse(localStorage.getItem(`chat_${currentUserId}_${id}`));
      const lastMsg = messages[messages.length - 1];
      const contactName = messages.find((m) => m.senderId === id)?.senderName || id;
      const initials = contactName
        .split(" ")
        .map(word => word.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2);

      return {
        id,
        name: contactName,
        initials,
        lastMessage: lastMsg?.message || "",
      };
    });

    setContacts(mapped);
  };

  const loadMessages = async (contact) => {
    const chatKey = `chat_${currentUserId}_${contact.id}`;
    const stored = localStorage.getItem(chatKey);
    const parsed = stored ? JSON.parse(stored) : [];

    const formatted = parsed.map((msg) => ({
      text: msg.message,
      sender: msg.senderId === currentUserId ? "user" : "bot",
      time: msg.timestamp,
    }));

    setMessages(formatted);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket.current || !selectedChat) return;

    const handleTyping = ({ senderId }) => {
      if (senderId === selectedChat.id.toString()) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    };

    socket.current.on("typing", handleTyping);
    return () => {
      socket.current.off("typing", handleTyping);
    };
  }, [socket, selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!input.trim() || !selectedChat) return;

    const msg = {
      senderId: currentUserId,
      receiverId: selectedChat.id.toString(),
      message: input.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.current.emit("privateMessage", msg);
    setInput("");
  };

  useEffect(() => {
    if (!socket.current || !selectedChat) return;

    const handleNewMessage = (msg) => {
      const isCurrentChat =
        (msg.senderId === currentUserId && msg.receiverId === selectedChat.id.toString()) ||
        (msg.receiverId === currentUserId && msg.senderId === selectedChat.id.toString());

      if (isCurrentChat) {
        setMessages((prev) => [
          ...prev,
          {
            text: msg.message,
            sender: msg.senderId === currentUserId ? "user" : "bot",
            time: msg.timestamp || new Date().toISOString(),
          },
        ]);
      }
    };

    socket.current.on("privateMessage", handleNewMessage);
    return () => socket.current.off("privateMessage", handleNewMessage);
  }, [socket, selectedChat, currentUserId]);

  return (
    <div className="h-screen w-full">
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
              {!showChat && (
                <div className="bg-white w-full md:w-[30%] rounded-xl md:rounded-2xl shadow-lg p-5">
                  <p className="text-2xl font-medium font-sans text-black p-3">Messages</p>
                  <div className="overflow-y-auto scrollbar-hide">
                    {contacts.length === 0 ? (
                      <p className="text-gray-500 text-sm px-3 pt-3">No messages yet. Chats appear after ride matches.</p>
                    ) : (
                      contacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
                          onClick={async () => {
                            setSelectedChat(contact);
                            if (window.innerWidth < 768) setShowChat(true);
                            await loadMessages(contact);
                          }}
                        >
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                            {contact.initials}
                          </div>
                          <div>
                            <p className="text-lg font-medium text-black">{contact.name}</p>
                            <p className="text-sm text-gray-600">{contact.lastMessage}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Mobile chat view */}
              {showChat && selectedChat && (
                <div className="bg-white w-full md:flex rounded-xl md:rounded-2xl shadow-lg flex flex-col h-full flex-grow">
                  <div className="p-3 flex items-center gap-3 border-b">
                    <button onClick={() => setShowChat(false)} className="text-gray-600">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                      {selectedChat.initials}
                    </div>
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
                          <p>{msg.text}</p>
                          <p className="text-[10px] mt-1 text-right opacity-70">
                            {new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef}></div>
                  </div>

                  {isTyping && <p className="text-sm text-gray-500 px-4 pb-1">Typing...</p>}

                  <div className="p-4 flex items-center gap-2 border-t">
                    <input
                      type="text"
                      className="flex-1 p-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        socket.current.emit("typing", {
                          senderId: currentUserId,
                          receiverId: selectedChat?.id.toString(),
                        });
                      }}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600" onClick={sendMessage}>
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Desktop chat view */}
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
                            <p>{msg.text}</p>
                            <p className="text-[10px] mt-1 text-right opacity-70">
                              {new Date(msg.time || msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef}></div>
                    </div>

                    {isTyping && (
                      <div className="flex items-center gap-1 px-4 pb-1">
                        <span className="dot-animation w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        <span className="dot-animation w-1.5 h-1.5 bg-red-500 rounded-full delay-150"></span>
                        <span className="dot-animation w-1.5 h-1.5 bg-red-500 rounded-full delay-300"></span>
                      </div>
                    )}

                    <div className="p-4 flex items-center gap-2 border-t">
                      <input
                        type="text"
                        className="flex-1 p-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          socket.current.emit("typing", {
                            senderId: currentUserId,
                            receiverId: selectedChat?.id.toString(),
                          });
                        }}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Massage;
