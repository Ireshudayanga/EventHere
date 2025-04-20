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
const adminRoutes = require('./api/routers/AdminRoutes');
const adminMessageRoutes = require('./api/routers/AdminMessageRoutes');



app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use("/api/special-category", specialCategoryRoutes);
app.use('/rides', rideRoutes);
app.use('/jwt', tokenRoutes);
app.use('/admin', adminRoutes);
app.use('/admin-messages', adminMessageRoutes);




// -------------------- SOCKET.IO SETUP --------------------
// In-memory chat message store (non-persistent)

const onlineUsers = {};
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
    console.log(`👤 ${userId} joined and mapped to socket ${socket.id}`);
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });


  // 💬 Admin Message Handler with Debug Logs
  socket.on("adminMessage", async ({ senderId, receiverId, message, senderName }) => {
    console.log("📥 adminMessage received on server:");
    console.log("   ↳ senderId:", senderId);
    console.log("   ↳ receiverId:", receiverId);
    console.log("   ↳ message:", message);
    console.log("   ↳ senderName:", senderName);

    const chatMessage = {
      senderId,
      senderName,
      receiverId,
      message,
      timestamp: new Date(),
    };

    const AdminMessage = require("./api/models/AdminMessage");

    try {
      await AdminMessage.create({
        name: senderName || "Unknown",
        email: senderId, // "admin"
        receiverId,
        message,
      });

      console.log("✅ Message saved to MongoDB");
    } catch (error) {
      console.error("❌ Error saving admin message:", error);
    }

    const receiverSocketId = onlineUsers[receiverId];
    const senderSocketId = onlineUsers[senderId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("adminMessage", chatMessage);
      console.log(`📤 Sent message to receiver (${receiverId}) via socket ${receiverSocketId}`);
    } else {
      console.log(`⚠️ Receiver (${receiverId}) is not online`);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("adminMessage", chatMessage);
      console.log(`📤 Sent message back to sender (${senderId}) via socket ${senderSocketId}`);
    } else {
      console.log(`⚠️ Sender (${senderId}) is not online`);
    }
  });



  socket.on("privateMessage", ({ senderId, receiverId, message, senderName }) => {
    const chatMessage = {
      senderId,
      senderName,
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

  // User joins ride room for location tracking
  socket.on("join-ride-room", (rideId) => {
    socket.join(rideId);
  });

  // Receive location and broadcast to the matched partner in the same ride
  socket.on("location-update", ({ rideId, lat, lng }) => {
    socket.to(rideId).emit("partner-location", { lat, lng });
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
