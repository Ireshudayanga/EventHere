/* eslint-disable react-hooks/rules-of-hooks */
// src/utils/socket.js
import { io } from "socket.io-client";
import useAxiosPublic from "../hooks/useAxiosPublic";


const axiosPublic = useAxiosPublic();

const socket = io(axiosPublic.defaults.baseURL, {
  transports: ["websocket"],
  withCredentials: true, // Optional if you use cookies/auth
});

export default socket;
