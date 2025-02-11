
const express = require('express');
const app = express();
const webSocket = require('ws');
const wss = new webSocket.Server({port: 8080});

// Middleware (Optional)
app.use(express.json()); 



// Routes
app.get('/', (req, res) => {
    res.send('Hello, Docker !');
});

// Start the Server
const PORT = 5000; // Choose your port number
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// WebSocket Server
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});

console.log('WebSocket server running on ws://localhost:8080');