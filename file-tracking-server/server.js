// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// In-memory storage for file requests (this simulates a database)
let currentFileRequest = null;

// Enable CORS to allow requests from different devices
app.use(cors());

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to handle file request from another department
app.post('/request-file', (req, res) => {
    const { requestDept, fileDescription } = req.body;

    if (!requestDept || !fileDescription) {
        return res.status(400).json({ message: 'Department and file description are required.' });
    }

    // Save the request in memory (in a real app, this would be stored in a database)
    currentFileRequest = { requestDept, fileDescription };

    console.log(`Request received to get file from ${requestDept} department. Description: ${fileDescription}`);

    // Respond with success and the data
    res.status(200).json({
        message: `File request sent successfully from ${requestDept} department.`,
        data: { requestDept, fileDescription }
    });
});

// Route to fetch the current file request (GET request)
app.get('/request-file', (req, res) => {
    if (currentFileRequest) {
        res.status(200).json(currentFileRequest);
    } else {
        res.status(404).json({ message: 'No current file request.' });
    }
});

// Start the server and listen on all network interfaces
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://172.168.169.183:${port}`);
});
