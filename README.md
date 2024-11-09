# File Tracking and Inventory Management System

This project is a **File Tracking and Inventory Management System** for IIIT Bhubaneswar, designed to track and manage physical files and department inventory. It includes features such as:
- **File Tracking**: Track file requests, current file status, and requests for file departure.
- **Inventory Management**: Manage inventory levels, verify order statuses, and update inventory quantities for various departments.
- **Integration**: Fetch file requests from an external system through API calls.

## Features

### 1. **File Tracking Management**
- **Current File Status**: Track the current status of a file (e.g., Shipped, In Transit, Delivered).
- **File Requests**: Allow departments to request files and track their status.
- **File Departure**: Allow administrators to approve or deny file departures.
- **External System Integration**: Fetch file requests from another system using an API.

### 2. **Inventory Management**
- **Department Inventory**: View and update inventory levels for different departments (e.g., CSE, ECE).
- **Inventory Alerts**: Show a "Verify Order" button if the current inventory is less than 10% of the ideal quantity.
- **Order Confirmation**: Mark inventory orders as confirmed and update their status.
- **Order Details File**: Generate a text file with order details when confirming orders.

## Setup

### Prerequisites

To run this project, you will need:
- A modern web browser (Google Chrome, Mozilla Firefox, etc.)
- Local or remote server to run the application (e.g., using Node.js/Express for backend integration)

### Installing

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/file-tracking-system.git
   cd file-tracking-system
   ```

2. **Install dependencies**:
   If you're using Node.js/Express for the backend, install necessary dependencies:
   ```bash
   npm install
   ```

3. **Start the application**:
   - For local testing, you can use a simple local server (e.g., `live-server` or a similar tool).
   - Alternatively, integrate with your backend server if applicable.

### File Tracking System

This system tracks the status of files between departments. It includes:
- A section to view the status of a file.
- A section to request a file or allow a file departure.
- Integration to show requests from another system via an API.

**API Endpoint for File Requests**:
```bash
GET https://othersystem.com/api/getFileRequests
```
Fetches the list of file requests from the external system.

### Inventory Management System

This system tracks and manages department-specific inventory. It includes:
- Inventory management for various items (e.g., Laptops, Projectors).
- The ability to decrease inventory when items are issued.
- Alerts when inventory drops below 10% of the ideal quantity.
- Features for confirming orders and updating the inventory levels.

### Sample Data Structure

#### File Tracking Example:
```json
{
    "12345": { 
        "status": "Shipped", 
        "estimatedDelivery": "2024-11-15", 
        "trackingURL": "https://www.carrier.com/track/12345"
    },
    "67890": { 
        "status": "In Transit", 
        "estimatedDelivery": "2024-11-20", 
        "trackingURL": "https://www.carrier.com/track/67890"
    }
}
```

#### Inventory Example:
```json
{
    "CSE": {
        "inventory": [
            { "item": "Laptop", "currentQty": 50, "idealQty": 100 },
            { "item": "Projector", "currentQty": 5, "idealQty": 10 }
        ],
        "orders": [
            { "tender": "Laptop Order", "dueDate": "2024-12-01", "status": "Pending" }
        ]
    }
}
```

## Usage

1. **Track File Status**: Enter a file’s Order ID to check its current status.
2. **Request Files**: Departments can submit requests for files and view the current status of their requests.
3. **Inventory Management**: View and manage inventory for various departments. You can update the inventory and confirm orders.
4. **External Requests**: Use the button "Load File Requests" to fetch and display file requests from an external system.

## Contributing

We welcome contributions to enhance the functionality of the system. To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Create a pull request.
