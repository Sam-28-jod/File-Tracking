// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Enable CORS to allow requests from different devices
app.use(cors());

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to handle file request from another department
app.post('/request-file', (req, res) => {
    const { requestDept, fileDescription } = req.body;

    // Ensure requestDept and fileDescription are provided
    if (!requestDept || !fileDescription) {
        return res.status(400).json({ message: 'Department and file description are required.' });
    }

    console.log(`Request received to get file from ${requestDept} department. Description: ${fileDescription}`);

    // Simulate a successful request by sending a response
    res.status(200).json({
        message: `File request sent successfully from ${requestDept} department.`,
        data: {
            requestDept,
            fileDescription
        }
    });
});

// Start the server and listen on all network interfaces
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://172.168.169.183:${port}`);
});
