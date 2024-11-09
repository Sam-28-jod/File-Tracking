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
        })
        .catch(error => {
            console.error('Error sending the request:', error);
            alert('Failed to send the request.');
        });
    } else {
        alert('Please provide both department and file description.');
    }
}

// Function to simulate allowing or disallowing the file to depart to another department
function allowDeparture(isAllowed) {
    const requestingDept = document.getElementById('requestingDept').textContent;
    const requestedFile = document.getElementById('requestedFile').textContent;

    if (isAllowed) {
        alert(`File "${requestedFile}" has been allowed to depart to the ${requestingDept} department.`);
        // Update the current department after departure
        document.getElementById('currentDept').textContent = requestingDept;
        document.getElementById('fileStatus').textContent = 'In Transit';
    } else {
        alert(`File "${requestedFile}" has not been allowed to depart to the ${requestingDept} department.`);
        // No change to the department or status
    }
}
