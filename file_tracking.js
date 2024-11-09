// file_tracking.js

// Function to simulate requesting a file from another department
// Function to simulate requesting a file from another department
async function requestFile() {
    const requestDept = document.getElementById('requestDept').value;
    const fileDescription = document.getElementById('fileDescription').value;

    if (requestDept && fileDescription) {
        try {
            // Send the file request to the backend
            const response = await fetch('http://<SERVER_IP>:3000/request-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    department: requestDept,
                    fileDescription: fileDescription
                })
            });

            const data = await response.json();

            // Update the status based on the response
            alert(data.message);

            // Optionally update the UI with the request details
            document.getElementById('currentDept').textContent = requestDept;
            document.getElementById('fileStatus').textContent = 'Requested';
        } catch (error) {
            alert('Error sending the request: ' + error.message);
        }
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
        
        // Trigger mail animation when file status changes to 'In Transit'
        const envelope = document.querySelector('.envelope');
        envelope.style.animationPlayState = 'running'; // Start animation
    } else {
        alert(`File "${requestedFile}" has not been allowed to depart to the ${requestingDept} department.`);
        // No change to the department or status
    }
}
// Function to check for new file requests from the server
async function checkForRequests() {
    try {
        // Replace 172.168.169.183 with the IP address of the server
        // Update this line in file_tracking.js to use the correct IP address
const response = await fetch('http://172.168.169.183:3000/request-file', { // Use the actual IP address of your server
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requestDept: requestDept,
      fileDescription: fileDescription,
    }),
  });
  
        
        if (response.ok) {
            const request = await response.json();

            // If there's a new request, update the UI
            if (request && request.department) {
                document.getElementById('requestingDept').textContent = request.department;
                document.getElementById('requestedFile').textContent = request.file;
            }
        } else {
            console.log('Failed to fetch request data');
        }
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

// Function to allow or deny file departure
async function allowDeparture(isAllowed) {
    const requestingDept = document.getElementById('requestingDept').textContent;
    const requestedFile = document.getElementById('requestedFile').textContent;

    try {
        // Send the response to the server
        await fetch('http://172.168.169.183:3000/allow-departure', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isAllowed, requestedFile, requestingDept })
        });

        // Update the file status based on the response
        if (isAllowed) {
            alert(`File "${requestedFile}" has been allowed to depart to the ${requestingDept} department.`);
        } else {
            alert(`File "${requestedFile}" has not been allowed to depart to the ${requestingDept} department.`);
        }
    } catch (error) {
        console.error('Error sending response:', error);
    }
}

// Poll for new requests every 5 seconds
setInterval(checkForRequests, 5000);

