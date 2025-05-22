/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

// Create context
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const socket = useRef(null);
  const [incomingRideRequest, setIncomingRideRequest] = useState(null);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [isRideMatched, setIsRideMatched] = useState(true);
  const [adminMessages, setAdminMessages] = useState([]);

  const sendAdminMessage = (msg) => {
    if (!msg?.message || !msg?.receiverId || !currentUser?.email) return;
    if (!socket.current) {
      console.warn("⚠️ Socket not connected yet.");
      return;
    }

    const payload = {
      senderId: currentUser?.email,
      senderName: currentUser?.displayName,
      ...msg,
      timestamp: new Date().toISOString(),
    };

    console.log("📤 Emitting adminMessage:", payload);
    socket.current.emit("adminMessage", payload);
  };

  useEffect(() => {
    if (!currentUser?.email) return;

    // Connect socket
    socket.current = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
    });
    
    console.log("🔌 Socket connected:", socket.current.id);

    socket.current.emit("join", currentUser.email);
    console.log(`📢 Sent join event with ID: ${currentUser.email}`);

    // 🔔 PRIVATE MESSAGE
    socket.current.on("privateMessage", (msg) => {
      console.log("📩 privateMessage received:", msg);
      const chatKey = `chat_${msg.senderId}_${msg.receiverId}`;
      const reverseKey = `chat_${msg.receiverId}_${msg.senderId}`;
      const keyToUse = msg.senderId === currentUser.email ? chatKey : reverseKey;

      const stored = JSON.parse(localStorage.getItem(keyToUse) || "[]");
      stored.push(msg);
      localStorage.setItem(keyToUse, JSON.stringify(stored));

      if (msg.senderId !== currentUser?.email) {
        setHasUnreadMessages(true);
        toast.info(`New message from ${msg.senderName}`);
      }
    });

    // 🔔 ADMIN MESSAGE
    socket.current.on("adminMessage", (msg) => {
      console.log("📩 adminMessage received to SocketProvider:", msg);
     

      const chatKey = `chat_${msg.senderId}_${msg.receiverId}`;
      const reverseKey = `chat_${msg.receiverId}_${msg.senderId}`;
      const keyToUse = msg.senderId === currentUser.email ? chatKey : reverseKey;

      const stored = JSON.parse(localStorage.getItem(keyToUse) || "[]");
      stored.push(msg);
      localStorage.setItem(keyToUse, JSON.stringify(stored));

      if (msg.senderId !== currentUser?.email) {
        setHasUnreadMessages(true);
      }

      if (msg.senderId === "admin" || msg.receiverId === "admin") {
        setAdminMessages((prev) => [...prev, msg]);
      }
    });

    // 🚗 RIDE ACCEPT
    socket.current.on("ride-accept-request", (data) => {
      console.log("🚗 ride-accept-request received:", data);
      setIncomingRideRequest(data);
      toast.info(`${data.name} wants to ride with you`);
    });

    // 🤝 RIDE CONFIRMED
    socket.current.on("ride-confirmed", (data) => {
      console.log("✅ ride-confirmed received:", data);
      toast.success("You have been matched!");
      setIsRideMatched(true);

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
        timestamp: new Date().toISOString(),
      };

      if (!localStorage.getItem(keyA) && !localStorage.getItem(keyB) && userEmail !== otherUserEmail) {
        localStorage.setItem(keyA, JSON.stringify([initialMessage]));
      }
    });

    // ❌ RIDE REJECTED
    socket.current.on("ride-rejected", () => {
      console.log("❌ ride-rejected received");
      toast.error("Ride was rejected");
    });

    return () => {
      console.log("🔌 Socket disconnecting...");
      socket.current.disconnect();
    };
  }, [currentUser]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        incomingRideRequest,
        setIncomingRideRequest,
        hasUnreadMessages,
        setHasUnreadMessages,
        isRideMatched,
        setIsRideMatched,
        adminMessages,
        sendAdminMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook
export const useSocket = () => useContext(SocketContext);
