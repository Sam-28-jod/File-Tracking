// login.js

// Sample data simulating a list of valid credentials
const validUsers = [
    { designation: 'Admin', password: 'admin123' },
    { designation: 'Manager', password: 'manager456' },
    { designation: 'Staff', password: 'staff789' },
    { designation: 'Professor', password: 'professor123' },
    { designation: 'HOD', password: 'hod456' },
    { designation: 'Student', password: 'student789' },
    { designation: 'Remit', password: 'remit123'}
];

// Function to validate login credentials
function validateLogin() {
    const password = document.getElementById('password').value;
    const designation = document.getElementById('designation').value;

    // Check if entered credentials match any entry in the validUsers array
    const isValid = validUsers.some(user => user.password === password && user.designation === designation);

    if (isValid) {
        // If valid, redirect to the dashboard
        window.location.href = 'dashboard.html';  // This should be your dashboard page
        return false;  // Prevent form submission (since we're redirecting)
    } else {
        // If invalid, show an error message
        alert('Invalid credentials, please try again.');
        return false;  // Prevent form submission
    }
}
