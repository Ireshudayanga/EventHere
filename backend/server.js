const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
require('dotenv').config();

const serviceAccount = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Fix newlines
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URI,
    client_x509_cert_url: process.env.CLIENT_CERT_URI,
  };

// Middleware
app.use(express.json());
app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


// Routes
app.get('/', (req, res) => {
    res.send('Hello, Docker hii !');
});

// Create HTTP Server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Change to frontend URL in production
        methods: ["GET", "POST"]
    }
});

// MongoDB Connection
mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@eventhere-cluster.9jdmr.mongodb.net/?retryWrites=true&w=majority&appName=EventHere-Cluster`)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error:', error.message));

// Import Routes
const userRoutes = require('./api/routers/UserRoutes');
app.use('/users', userRoutes);

const eventRoutes = require('./api/routers/EventRoutes');
app.use('/events', eventRoutes);

const specialCategoryRoutes = require("./api/routers/SpecialCategoryRoutes");
app.use("/api/special-category", specialCategoryRoutes);

const rideRoutes = require('./api/routers/ShareRideRoutes');
app.use('/rides', rideRoutes);

const tokenRoutes = require('./api/routers/TokenRoutes');
app.use('/jwt', tokenRoutes);

// -------------------- CHAT FUNCTIONALITY --------------------

// Chat Schema & Model
const chatSchema = new mongoose.Schema({
    sender: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);

// Chat Routes
app.get("/messages", async (req, res) => {
    try {
        const messages = await Chat.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/messages", async (req, res) => {
    try {
        const { sender, message } = req.body;
        const chatMessage = new Chat({ sender, message });
        await chatMessage.save();

        io.emit("message", chatMessage); // Real-time update
        res.json(chatMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Socket.io Handling
io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("sendMessage", async (data) => {
        const chatMessage = new Chat(data);
        await chatMessage.save();
        io.emit("message", chatMessage);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

// Start Server with Socket.io
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
