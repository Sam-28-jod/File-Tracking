const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Enable CORS to allow requests from the frontend
app.use(cors());
app.use(bodyParser.json()); // to parse JSON bodies

// Temporary mock of file requests (this will simulate the request coming in from another computer)
let fileRequestQueue = [];

// Endpoint to handle file requests from the frontend
app.post('/request-file', (req, res) => {
    const { department, fileDescription } = req.body;

    // Store the request in the queue (simulate requesting file from another department)
    fileRequestQueue.push({ department, fileDescription });

    console.log(`File requested from ${department}: ${fileDescription}`);
    
    // Send a response back to the frontend
    res.status(200).json({ message: 'Request received' });
    res.json({ message: `Request for file from ${department} has been received.` });
});

// Endpoint to check the current file requests (for the frontend to check)
app.get('/current-request', (req, res) => {
    // Send the first request from the queue (you can modify this to serve multiple requests)
    if (fileRequestQueue.length > 0) {
        const request = fileRequestQueue[0]; // Get the first request in the queue
        res.json(request);
    } else {
        res.json({ message: 'No requests' });
    }
});

// Endpoint to handle file departure decisions (approve or deny)
app.post('/allow-departure', (req, res) => {
    const { isAllowed, requestedFile, requestingDept } = req.body;
    
    if (isAllowed) {
        console.log(`File "${requestedFile}" has been allowed to depart to ${requestingDept}`);
    } else {
        console.log(`File "${requestedFile}" has not been allowed to depart to ${requestingDept}`);
    }

    res.json({ message: isAllowed ? 'File departure allowed' : 'File departure denied' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://172.168.169.183:${port}`);
});
