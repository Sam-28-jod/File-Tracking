// file_tracking.js

// Function to simulate requesting a file from another department
function requestFile() {
    const requestDept = document.getElementById('requestDept').value;
    const fileDescription = document.getElementById('fileDescription').value;

    if (requestDept) {
        alert(`File has been requested from the ${requestDept} department. Description: ${fileDescription}`);
        // Update the current department after request
        document.getElementById('currentDept').textContent = requestDept;
        document.getElementById('fileStatus').textContent = 'Requested';
    } else {
        alert('Please select a department to request the file from.');
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
