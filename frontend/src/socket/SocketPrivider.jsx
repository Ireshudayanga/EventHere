/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

// Create context
export const SocketContext = createContext();

// Provider component
export const SocketProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const socket = useRef(null);
  const [incomingRideRequest, setIncomingRideRequest] = useState(null); // 👈 store ride request
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [isRideMatched, setIsRideMatched] = useState(false); // NEW
  const [adminMessages, setAdminMessages] = useState([]);

  const sendAdminMessage = (msg) => {
    if (!msg?.message || !msg?.receiverId || !currentUser?.email) return;
    if (!socket.current) {
      console.warn("Socket not connected yet.");
      return;
    }
  
    const payload = {
      senderId: currentUser?.email,
      senderName: currentUser?.displayName,
      ...msg,
      timestamp: new Date().toISOString(),
    };
  
    socket.current.emit("adminMessage", payload);
  };
  

  useEffect(() => {
    if (!currentUser?.email) return;

    // Connect socket
    socket.current = io("http://localhost:5000");
    socket.current.emit("join", currentUser.email);

    //  receive global message
    socket.current.on("privateMessage", (msg) => {
      const chatKey = `chat_${msg.senderId}_${msg.receiverId}`;
      const reverseKey = `chat_${msg.receiverId}_${msg.senderId}`;
      const keyToUse = msg.senderId === currentUser.email ? chatKey : reverseKey;

      const stored = JSON.parse(localStorage.getItem(keyToUse) || "[]");
      stored.push(msg);
      localStorage.setItem(keyToUse, JSON.stringify(stored));

      if (msg.senderId !== currentUser?.email) {
        setHasUnreadMessages(true); // 💡 Set unread flag
        toast.info(`New message from ${msg.senderName}`);
      }
      // console.log(`💬 New message from ${msg.senderName}:`, msg);
    });


    // 👂 Handle admin replies
    socket.current.on("adminMessage", (msg) => {
      // Store in localStorage like private messages
      const chatKey = `chat_${msg.senderId}_${msg.receiverId}`;
      const reverseKey = `chat_${msg.receiverId}_${msg.senderId}`;
      const keyToUse = msg.senderId === currentUser.email ? chatKey : reverseKey;
    
      const stored = JSON.parse(localStorage.getItem(keyToUse) || "[]");
      stored.push(msg);
      localStorage.setItem(keyToUse, JSON.stringify(stored));
    
      // Update unread state if it's from admin
      if (msg.senderId !== currentUser?.email) {
        setHasUnreadMessages(true);
        toast.info(`New message from ${msg.senderName}`);
      }
    
      // Optional: track admin-specific messages separately
      if (msg.senderId === "admin" || msg.receiverId === "admin") {
        setAdminMessages((prev) => [...prev, msg]);
      }
    });
    

    // 🎯 Receive ride acceptance
    socket.current.on("ride-accept-request", (data) => {
      // Save incoming ride request data to state
      setIncomingRideRequest(data);
      console.log("🚗 Ride request:", data);
      toast.info(`${data.name} wants to ride with you`);
    });

    socket.current.on("ride-confirmed", (data) => {
      toast.success("You have been matched!");
      setIsRideMatched(true); // 👈 NEW: update state shared across app

      // Your existing code...
      const userEmail = currentUser?.email;
      const otherUserEmail = data?.from;
      const otherUserName = data?.name;

      const keyA = `chat_${userEmail}_${otherUserEmail}`;
      const keyB = `chat_${otherUserEmail}_${userEmail}`;
      const initialMessage = {
        senderId: otherUserEmail,
        senderName: otherUserName,
        receiverId: userEmail,
        message: "🎉 Ride matched successfully! Say hi to your ride partner!",
        timestamp: new Date().toISOString()
      };

      if (!localStorage.getItem(keyA) && !localStorage.getItem(keyB) && userEmail !== otherUserEmail) {
        localStorage.setItem(keyA, JSON.stringify([initialMessage]));
      }
    });



    socket.current.on("ride-rejected", () => {
      toast.error("Ride was rejected");
      // Handle fallback UI on rejection
    });

    return () => {
      socket.current.disconnect();
    };
  }, [currentUser]);



  return (
    <SocketContext.Provider value={{ socket, incomingRideRequest, setIncomingRideRequest, hasUnreadMessages, setHasUnreadMessages, isRideMatched, setIsRideMatched , adminMessages, sendAdminMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for easier access
export const useSocket = () => useContext(SocketContext);
