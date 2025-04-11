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

// MongoDB Connection (still used for user/event routes)
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

// -------------------- CHAT FUNCTIONALITY (Local only) --------------------

// In-memory chat message store (non-persistent)

const onlineUsers = {};



// -------------------- SOCKET.IO SETUP --------------------

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🔵 User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    onlineUsers[userId] = socket.id;

    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  socket.on("privateMessage", ({ senderId, receiverId, message }) => {
    const chatMessage = {
      senderId,
      receiverId,
      message,
      timestamp: new Date()
    };

    io.to(receiverId).emit("privateMessage", chatMessage);
    io.to(senderId).emit("privateMessage", chatMessage);
  });

  socket.on("typing", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("typing", { senderId });
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("stopTyping", { senderId });
  });

  // RIDE ACCEPT REQUEST
  socket.on("ride-accept-request", ({ to, from, rideId, name }) => {
    const receiverSocketId = onlineUsers[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("ride-accept-request", {
        from,
        rideId,
        name,
      });
    }
  });

  // RIDE CONFIRMED
  socket.on("ride-confirmed", ({ to, from, name }) => {
    const receiverSocketId = onlineUsers[to];
    const senderSocketId = onlineUsers[from];
  
    const payload = { from, name };
  
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("ride-confirmed", payload);
    }
  
    if (senderSocketId) {
      io.to(senderSocketId).emit("ride-confirmed", payload); // ✅ send to the one who accepted too
    }
  });
  

  // RIDE REJECTED
  socket.on("ride-rejected", ({ to }) => {
    const senderSocketId = onlineUsers[to];
    if (senderSocketId) {
      io.to(senderSocketId).emit("ride-rejected");
    }
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
