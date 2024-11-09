// Function to load inventory data from localStorage or use default values if not available
function loadInventory() {
    const storedData = localStorage.getItem("departments");
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        const departments = {
            CSE: {
                inventory: [
                    { item: "Laptop", currentQty: 50, idealQty: 100 },
                    { item: "Projector", currentQty: 5, idealQty: 10 },
                    { item: "Whiteboard Marker", currentQty: 30, idealQty: 50 }
                ],
                orders: [
                    { tender: "Laptop Order", dueDate: "2024-12-01", status: "Pending" },
                    { tender: "Projector Repair", dueDate: "2024-11-15", status: "Pending" }
                ]
            },
            ECE: {
                inventory: [
                    { item: "Oscilloscope", currentQty: 8, idealQty: 15 },
                    { item: "Soldering Iron", currentQty: 10, idealQty: 20 },
                    { item: "Microcontroller Kit", currentQty: 25, idealQty: 30 }
                ],
                orders: [
                    { tender: "Oscilloscope Purchase", dueDate: "2024-12-05", status: "Pending" },
                    { tender: "Soldering Iron Repair", dueDate: "2024-11-20", status: "Pending" }
                ]
            }
        };
        return departments;
    }
}

// Function to save updated inventory data to localStorage
function saveInventory() {
    localStorage.setItem("departments", JSON.stringify(departments));
}

// Inventory data (initially loaded from localStorage or default)
const departments = loadInventory();

// Function to decrease inventory by 1
function decreaseInventory(itemIndex, department) {
    if (departments[department].inventory[itemIndex].currentQty > 0) {
        departments[department].inventory[itemIndex].currentQty -= 1;
        saveInventory();
        viewInventory(department);
    } else {
        alert("Quantity cannot be less than 0.");
    }
}

// Function to check inventory levels and prompt if under 10% of the ideal quantity
function checkInventoryLevels(department) {
    departments[department].inventory.forEach((item, index) => {
        const threshold = item.idealQty * 0.1; // 10% of the ideal quantity
        const buttonContainer = document.getElementById(`verifyButton-${department}-${index}`);

        // Check if the quantity is less than 10% of ideal quantity
        if (item.currentQty < threshold && departments[department].orders[index].status !== "Confirmed") {
            if (!buttonContainer.querySelector('button')) {
                const verifyButton = document.createElement('button');
                verifyButton.textContent = `Verify Order for ${item.item}`;
                verifyButton.onclick = () => verifyOrder(department, index, item);
                buttonContainer.appendChild(verifyButton);
            }
        }
    });
}

// Function to verify the order and show "Confirm Order Received" button
function verifyOrder(department, itemIndex, item) {
    const buttonContainer = document.getElementById(`verifyButton-${department}-${itemIndex}`);
    buttonContainer.innerHTML = '';  // Clear previous buttons
    
    const confirmButton = document.createElement('button');
    confirmButton.textContent = `Confirm Order Received for ${item.item}`;
    confirmButton.onclick = () => confirmOrderReceived(department, itemIndex, item);
    
    buttonContainer.appendChild(confirmButton);
    alert(`The inventory for ${item.item} has been updated to the ideal quantity.`);
}

// Function to confirm the order is received and update the date
function confirmOrderReceived(department, itemIndex, item) {
    departments[department].inventory[itemIndex].currentQty = item.idealQty;

    // Update the order date to the current date
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    departments[department].orders[itemIndex].dueDate = currentDate;
    departments[department].orders[itemIndex].status = "Confirmed"; // Mark the order as confirmed

    // Save updated inventory and orders
    saveInventory();

    // Generate a text file with order details
    generateOrderDetailsFile(department, item, currentDate);

    alert(`The order for ${item.item} has been confirmed. Order date updated to ${currentDate}.`);
    
    // Reload the inventory view
    viewInventory(department);
}

// Function to generate a text file with order details
function generateOrderDetailsFile(department, item, currentDate) {
    const orderDetails = `
    Order Details for ${department} Department:
    Item: ${item.item}
    Current Quantity: ${item.currentQty}
    Ideal Quantity: ${item.idealQty}
    Order Date: ${currentDate}
    Tender: ${departments[department].orders[departments[department].inventory.indexOf(item)].tender}
    Number of Items Ordered: ${item.idealQty - item.currentQty} items
    `;
    
    // Create a Blob from the order details text
    const blob = new Blob([orderDetails], { type: "text/plain" });
    
    // Create a link to download the text file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${item.item}_order_details.txt`; // Filename for the order details text file
    link.click(); // Trigger the download
}

// Function to view inventory for a specific department
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
        orderStatus += `
            <li>${order.tender} - Due by: ${order.dueDate} (Status: ${order.status})</li>
        `;
    });
    document.getElementById("orderStatusList").innerHTML = orderStatus;

    checkInventoryLevels(department);
}

// Function to populate department dropdown and show inventory based on selection
function populateDepartmentDropdown() {
    const departmentDropdown = document.getElementById("departmentDropdown");
    
    // Populate the dropdown with department options
    Object.keys(departments).forEach(department => {
        const option = document.createElement("option");
        option.value = department;
        option.textContent = department;
        departmentDropdown.appendChild(option);
    });

    // Default select the first department
    departmentDropdown.selectedIndex = 0;
    viewInventory(departmentDropdown.value); // Show inventory for the first department by default
}

// Initial load: Populate the department dropdown and show inventory for the first department
populateDepartmentDropdown();
