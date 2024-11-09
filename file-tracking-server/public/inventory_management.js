// Sample order data for package tracking
const orderTrackingData = {
    "12345": { status: "Shipped", estimatedDelivery: "2024-11-15", trackingURL: "https://www.carrier.com/track/12345" },
    "67890": { status: "In Transit", estimatedDelivery: "2024-11-20", trackingURL: "https://www.carrier.com/track/67890" },
    "11223": { status: "Delivered", estimatedDelivery: "2024-11-10", trackingURL: "https://www.carrier.com/track/11223" },
};

// Load departments data from localStorage or initialize with default if not available
function loadInventory() {
    const storedData = localStorage.getItem("departments");
    return storedData ? JSON.parse(storedData) : getDefaultInventory();
}

// Get default inventory if no data is found in localStorage
function getDefaultInventory() {
    return {
        CSE: {
            inventory: [
                { item: "Laptop", currentQty: 50, idealQty: 100 },
                { item: "Projector", currentQty: 5, idealQty: 10 },
                { item: "Whiteboard Marker", currentQty: 30, idealQty: 50 }
            ],
            orders: []
        },
        ECE: {
            inventory: [
                { item: "Oscilloscope", currentQty: 8, idealQty: 15 },
                { item: "Soldering Iron", currentQty: 10, idealQty: 20 },
                { item: "Microcontroller Kit", currentQty: 25, idealQty: 30 }
            ],
            orders: []
        }
    };
}

// Global variable to store the departments data
let departments = loadInventory();

// Save updated inventory data to localStorage
function saveInventory() {
    localStorage.setItem("departments", JSON.stringify(departments));
}

// Function to decrease inventory by 1 and save updates
function decreaseInventory(itemIndex, department) {
    const item = departments[department].inventory[itemIndex];
    
    if (item.currentQty > 0) {
        item.currentQty -= 1;
        saveInventory();
        viewInventory(department);
    } else {
        alert("Quantity cannot be less than 0.");
    }
}

// Check inventory levels and add "Verify Order" button if low
function checkInventoryLevels(department) {
    departments[department].inventory.forEach((item, index) => {
        const threshold = item.idealQty * 0.1;
        const buttonContainer = document.getElementById(`verifyButton-${department}-${index}`);
        buttonContainer.innerHTML = ""; // Clear any existing button

        if (item.currentQty < threshold) {
            const orderExists = departments[department].orders.some(order => order.item === item.item && order.status !== "Confirmed");

            // If no pending order exists, create a new order entry
            if (!orderExists) {
                const newOrder = {
                    item: item.item,
                    tender: `${item.item} Reorder`,
                    dueDate: "Pending",
                    status: "Pending"
                };
                departments[department].orders.push(newOrder);
            }

            const verifyButton = document.createElement("button");
            verifyButton.textContent = `Verify Order for ${item.item}`;
            verifyButton.onclick = () => verifyOrder(department, index, item);
            buttonContainer.appendChild(verifyButton);
        }
    });
}

// Verify order and show "Confirm Order Received" button
function verifyOrder(department, itemIndex, item) {
    const buttonContainer = document.getElementById(`verifyButton-${department}-${itemIndex}`);
    buttonContainer.innerHTML = '';

    const confirmButton = document.createElement('button');
    confirmButton.textContent = `Confirm Order Received for ${item.item}`;
    confirmButton.onclick = () => confirmOrderReceived(department, itemIndex, item);

    buttonContainer.appendChild(confirmButton);
    alert(`The inventory for ${item.item} has been updated to the ideal quantity.`);
}

// Confirm order and update inventory
function confirmOrderReceived(department, itemIndex, item) {
    const departmentInventory = departments[department].inventory[itemIndex];
    const order = departments[department].orders.find(order => order.item === item.item && order.status !== "Confirmed");

    departmentInventory.currentQty = item.idealQty;
    const currentDate = new Date().toISOString().split('T')[0];
    if (order) {
        order.dueDate = currentDate;
        order.status = "Confirmed";
    }

    saveInventory();

    generateOrderDetailsFile(department, item, currentDate);
    alert(`The order for ${item.item} has been confirmed. Order date updated to ${currentDate}.`);
    
    viewInventory(department);
}

// Generate a text file with order details
function generateOrderDetailsFile(department, item, currentDate) {
    const orderDetails = `
    Order Details for ${department} Department:
    Item: ${item.item}
    Current Quantity: ${item.currentQty}
    Ideal Quantity: ${item.idealQty}
    Order Date: ${currentDate}
    Number of Items Ordered: ${item.idealQty - item.currentQty} items
    `;

    const blob = new Blob([orderDetails], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${item.item}_order_details.txt`;
    link.click();
}

// View inventory for a specific department
function viewInventory(department) {
    document.getElementById("inventory").style.display = "block";
    document.getElementById("departmentName").textContent = department + " Inventory";

    let inventoryDetails = "";
    departments[department].inventory.forEach((item, index) => {
        inventoryDetails += `
            <tr>
                <td>${item.item}</td>
                <td id="qty-${department}-${index}">${item.currentQty}</td>
                <td>${item.idealQty}</td>
                <td><button onclick="decreaseInventory(${index}, '${department}')">Decrease</button></td>
                <td id="verifyButton-${department}-${index}"></td>
            </tr>
        `;
    });
    document.getElementById("inventoryDetails").innerHTML = inventoryDetails;

    let orderStatus = "";
    departments[department].orders.forEach(order => {
        orderStatus += `<li>${order.tender} - Due by: ${order.dueDate} (Status: ${order.status})</li>`;
    });
    document.getElementById("orderStatusList").innerHTML = orderStatus;

    checkInventoryLevels(department);
}

// Populate department dropdown and view the first selection's inventory
function populateDepartmentDropdown() {
    const departmentDropdown = document.getElementById("departmentDropdown");
    departmentDropdown.innerHTML = "";

    Object.keys(departments).forEach(department => {
        const option = document.createElement("option");
        option.value = department;
        option.textContent = department;
        departmentDropdown.appendChild(option);
    });

    departmentDropdown.selectedIndex = 0;
    viewInventory(departmentDropdown.value);
}

// Initial load: Populate dropdown and view first department's inventory
populateDepartmentDropdown();
