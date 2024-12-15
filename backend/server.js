// Import Express
const express = require('express');

// Initialize Express App
const app = express();

// Middleware (Optional)
app.use(express.json()); // For parsing JSON request bodies

// Routes
app.get('/', (req, res) => {
    res.send('Hello, Docker!');
});

// Start the Server
const PORT = 5000; // Choose your port number
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
