require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const admin = require("firebase-admin");
const PORT = process.env.PORT || 5000;

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Firebase Admin Setup
const serviceAccount = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), 
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URI,
    client_x509_cert_url: process.env.CLIENT_CERT_URI,
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@eventhere-cluster.9jdmr.mongodb.net/?retryWrites=true&w=majority&appName=EventHere-Cluster`
        );
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Hello, Docker!');
});

// -------------------- ROUTES --------------------

// Import & Use Routes
const userRoutes = require('./api/routers/UserRoutes');
const eventRoutes = require('./api/routers/EventRoutes');
const specialCategoryRoutes = require("./api/routers/SpecialCategoryRoutes");
const rideRoutes = require('./api/routers/ShareRideRoutes');
const tokenRoutes = require('./api/routers/TokenRoutes');

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use("/api/special-category", specialCategoryRoutes);
app.use('/rides', rideRoutes);
app.use('/jwt', tokenRoutes);

// -------------------- CHAT FUNCTIONALITY --------------------

// Manual POST for testing: send message
app.post("/send-message", async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ error: "senderId, receiverId, and message are required." });
  }

  try {
    const newMessage = new Chat({ senderId, receiverId, message });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message saved",
      data: newMessage
    });
  } catch (err) {
    console.error("❌ Error saving message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});





// Chat schema
const chatSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  });
  const Chat = mongoose.model("Chat", chatSchema);

// In-memory user tracking
const onlineUsers = {};


// REST APIs
app.get("/messages/:user1/:user2", async (req, res) => {
    const { user1, user2 } = req.params;
    const messages = await Chat.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  });


// Get list of users chatted with
app.get("/chat-list/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Chat.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    });

    const usersMap = new Map();

    messages.forEach(msg => {
      const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      if (!usersMap.has(otherUserId)) {
        usersMap.set(otherUserId, {
          id: otherUserId,
          lastMessage: msg.message,
          timestamp: msg.timestamp
        });
      } else {
        // Keep the latest message
        const existing = usersMap.get(otherUserId);
        if (msg.timestamp > existing.timestamp) {
          usersMap.set(otherUserId, {
            id: otherUserId,
            lastMessage: msg.message,
            timestamp: msg.timestamp
          });
        }
      }
    });

    // Convert Map to array
    const chatUsers = Array.from(usersMap.values());
    res.json(chatUsers);
  } catch (err) {
    console.error("Error fetching chat list:", err);
    res.status(500).json({ error: "Failed to fetch chat list" });
  }
});


// -------------------- SOCKET.IO SETUP --------------------

// Create HTTP Server & WebSocket
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Change to frontend URL in production
        methods: ["GET", "POST"]
    }
});

// Handle WebSocket Connections
io.on("connection", (socket) => {
    console.log("🔵 User connected:", socket.id);
  
    socket.on("join", (userId) => {
      socket.join(userId);
      onlineUsers[userId] = socket.id;
  
      io.emit("onlineUsers", Object.keys(onlineUsers));
    });
  
    socket.on("privateMessage", async ({ senderId, receiverId, message }) => {
      const chatMessage = new Chat({ senderId, receiverId, message });
      await chatMessage.save();
  
      io.to(receiverId).emit("privateMessage", chatMessage);
      io.to(senderId).emit("privateMessage", chatMessage);
    });
  
    socket.on("typing", ({ senderId, receiverId }) => {
      io.to(receiverId).emit("typing", { senderId });
    });
    
    socket.on("stopTyping", ({ senderId, receiverId }) => {
      io.to(receiverId).emit("stopTyping", { senderId });
    });
    
  
    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
          break;
        }
      }
      io.emit("onlineUsers", Object.keys(onlineUsers));
    });
  });
  

// -------------------- START SERVER --------------------

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
