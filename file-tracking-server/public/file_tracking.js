// file_tracking.js

// Function to simulate requesting a file from another department
function requestFile() {
    const requestDept = document.getElementById('requestDept').value;
    const fileDescription = document.getElementById('fileDescription').value;

    if (requestDept && fileDescription) {
        // Send the file request to the server
        fetch('http://172.168.169.183:3000/request-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requestDept: requestDept,
                fileDescription: fileDescription
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Request sent successfully:', data);
            alert('File request sent successfully!');
            // After sending the request, fetch the latest request to update the display
            fetchFileRequest();
        })
        .catch(error => {
            console.error('Error sending the request:', error);
            alert('Failed to send the request.');
        });
    } else {
        alert('Please provide both department and file description.');
    }
}

// Function to fetch the latest file request and display it in the "Allow File Departure" section
function fetchFileRequest() {
    fetch('http://172.168.169.183:3000/request-file', {
        method: 'GET'  // Use GET method to retrieve the request
    })
    .then(response => response.json())
    .then(data => {
        console.log('File request data:', data); // Log the response for debugging
        if (data && data.requestDept && data.fileDescription) {
            // Update the "Allow File Departure" section with the request details
            document.getElementById('requestingDept').textContent = data.requestDept;
            document.getElementById('requestedFile').textContent = data.fileDescription;
        } else {
            console.log('No current file request.');
            document.getElementById('requestingDept').textContent = 'Waiting for request...';
            document.getElementById('requestedFile').textContent = 'Waiting for request...';
        }
    })
    .catch(error => console.error('Error fetching request:', error));
}

// Function to simulate allowing or disallowing the file to depart to another department
function allowDeparture(isAllowed) {
    const requestingDept = document.getElementById('requestingDept').textContent;
    const requestedFile = document.getElementById('requestedFile').textContent;

    if (isAllowed) {
        alert(`File "${requestedFile}" has been allowed to depart to the ${requestingDept} department.`);
        // Update the current department after departure
        document.getElementById('currentDept').textContent = requestingDept;
        document.getElementById('fileStatus').textContent = 'In Transit';  // Update file status to 'In Transit'
        document.getElementById('confirmReceiptSection').style.display = 'block'; // Show receipt confirmation section
    } else {
        alert(`File "${requestedFile}" has not been allowed to depart to the ${requestingDept} department.`);
        // Set file status to 'Denied' if not allowed
        document.getElementById('fileStatus').textContent = 'Denied';  // Update file status to 'Denied'
        document.getElementById('confirmReceiptSection').style.display = 'none'; // Hide receipt confirmation section
    }
}

// Function to confirm the receipt of the file
function confirmReceipt() {
    const receiptText = document.getElementById('receiptConfirmation').value;

    if (receiptText) {
        alert(`Receipt confirmed: ${receiptText}`);
        // Optionally, update file status after confirmation
        document.getElementById('fileStatus').textContent = 'Received';  // Change status to 'Received'
        document.getElementById('confirmReceiptSection').style.display = 'none'; // Hide confirmation section after receipt
    } else {
        alert('Please enter confirmation text.');
    }
}

// Call the fetchFileRequest function when the page loads to display the latest request
document.addEventListener('DOMContentLoaded', fetchFileRequest);
