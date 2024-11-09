const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let currentRequest = null; // Holds the latest request

// Endpoint to receive requests from other computers
app.post('/request-file', (req, res) => {
    currentRequest = req.body;
    console.log('Received request:', currentRequest);
    res.json({ message: 'Request received' });
});

// Endpoint to retrieve the current request
app.get('/current-request', (req, res) => {
    res.json(currentRequest);
});

// Start the server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
