/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

// Create context
export const SocketContext = createContext();

// Provider component
export const SocketProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const socket = useRef(null);

  useEffect(() => {
    if (!currentUser?.email) return;

    // Connect socket
    socket.current = io("http://localhost:5000");
    socket.current.emit("join", currentUser.email);

    // Example: receive global message
    socket.current.on("privateMessage", (msg) => {
      const chatKey = `chat_${msg.senderId}_${msg.receiverId}`;
      const reverseKey = `chat_${msg.receiverId}_${msg.senderId}`;
      const keyToUse = msg.senderId === currentUser.email ? chatKey : reverseKey;

      const stored = JSON.parse(localStorage.getItem(keyToUse) || "[]");
      stored.push(msg);
      localStorage.setItem(keyToUse, JSON.stringify(stored));

      (msg.senderId !== currentUser.email) && toast.info(`New message from ${msg.senderId}`);
      //console.log(`💬 New message from ${msg.senderId}:`, msg);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for easier access
export const useSocket = () => useContext(SocketContext);
