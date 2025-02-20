
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 6001;

require('dotenv').config();

// Middleware (Optional)
app.use(express.json()); 
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Hello, Docker hii !');
});

// Connect to MongoDB
mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@eventhere-cluster.9jdmr.mongodb.net/?retryWrites=true&w=majority&appName=EventHere-Cluster`)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log('Error:', error.message);
}); 

// Import User Routes
const userRoutes = require('./api/routers/UserRoutes');
app.use('/users', userRoutes);

const eventRoutes = require('./api/routers/EventRoutes');
app.use('/events', eventRoutes);


// Start the Server
const PORT = 5000; // Choose your port number
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
