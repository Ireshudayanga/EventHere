// src/utils/socket.js
import { io } from "socket.io-client";

// Replace with your backend URL directly (adjust for prod if needed)
const socket = io("http://:5000", {
  transports: ["websocket"],
  withCredentials: true, // Optional if using cookies/auth
});

export default socket;
