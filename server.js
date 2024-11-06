const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 80; // Change the port to 80

let headsCount = 0;
let tailsCount = 0;
let tossTimestamps = []; // Array to store the timestamps of each toss

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as needed
});

// Endpoint to get total toss count and percentages
app.get('/api/toss-count', (req, res) => {
    const totalTosses = headsCount + tailsCount;
    const headsPercentage = totalTosses ? (headsCount / totalTosses) * 100 : 0;
    const tailsPercentage = totalTosses ? (tailsCount / totalTosses) * 100 : 0;

    // Get the current time in milliseconds
    const currentTime = Date.now();

    // Filter timestamps to calculate how many tosses happened in the last minute, hour, and day
    const lastMinuteTosses = tossTimestamps.filter(timestamp => currentTime - timestamp <= 60 * 1000).length;
    const lastHourTosses = tossTimestamps.filter(timestamp => currentTime - timestamp <= 60 * 60 * 1000).length;
    const lastDayTosses = tossTimestamps.filter(timestamp => currentTime - timestamp <= 24 * 60 * 60 * 1000).length;

    res.json({
        totalTossCount: totalTosses,
        headsCount: headsCount,
        tailsCount: tailsCount,
        headsPercentage: headsPercentage.toFixed(2), // Ensure this is formatted correctly
        tailsPercentage: tailsPercentage.toFixed(2),
        lastMinuteTosses: lastMinuteTosses,
        lastHourTosses: lastHourTosses,
        lastDayTosses: lastDayTosses
    });
});

// Endpoint to update counts on toss
app.post('/api/toss', (req, res) => {
    const { result } = req.body; // Assume result is either "heads" or "tails"
    
    // Record the current timestamp when a toss happens
    const timestamp = Date.now();
    tossTimestamps.push(timestamp);

    if (result === 'heads') {
        headsCount++;
    } else if (result === 'tails') {
        tailsCount++;
    }

    res.status(200).send();
});

// Listen on port 80
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
