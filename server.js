const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 80; // Change to port 80

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // To parse JSON request bodies

let totalTossCount = 0; // In-memory total toss count

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to get the total toss count
app.get('/api/toss-count', (req, res) => {
    res.json({ totalTossCount });
});

// Endpoint to update the toss count
app.post('/api/toss', (req, res) => {
    totalTossCount++;
    res.json({ totalTossCount });
});

// Create an HTTP server and listen on port 80
http.createServer(app).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
