// This function runs when you add a new expense
function addExp() {

    // Grab values from input fields
    const expName = document.getElementById('expName').value;
    const amount = document.getElementById('amount').value;
    const quantity = document.getElementById('quantity').value;
    const date = document.getElementById('date').value;
    const expType = document.getElementById('expenseType').value;
    const expCategory = document.getElementById('expenseCategory').value;

    // Basic validation: check if any field is empty
    if (
        expName == "" || 
        amount == "" || 
        quantity == "" || 
        date == "" || 
        expType == "" || 
        expCategory == ""
    ) {
        alert("please Enter all the values");
        return; // IMPORTANT: stop execution if validation fails
    }

    // Convert amount & quantity from string to number
    let amountNum = Number(amount);
    let quantityNum = Number(quantity);

    // Check if conversion failed (user typed text instead of numbers)
    if (isNaN(amountNum) || isNaN(quantityNum)) {
        alert("Amount and Quantity must be numbers");
        return;
    }

    // Get existing data from localStorage
    // If nothing exists, start with an empty array
    let inputData = JSON.parse(localStorage.getItem("inputData")) || [];

    // Push new expense object into array
    inputData.push({
        ExpenseName: expName,
        Amount: amountNum,
        Quantity: quantityNum,
        ExpenseCategory: expCategory,
        ExpenseType: expType,
        Date: date,
    });

    // Save updated array back to localStorage
    localStorage.setItem("inputData", JSON.stringify(inputData));

    console.log(inputData);

    // Clear input fields after saving
    document.getElementById('expName').value = "";
    document.getElementById('amount').value = "";
    document.getElementById('quantity').value = "";
    document.getElementById('date').value = "";

    // Re-render table with updated data
    renderTable(inputData);
}



// This function renders the table rows dynamically
function renderTable(data) {

    // Select table body
    let expTableBody = document.getElementById("expTableBody");

    // Clear existing rows to avoid duplicates
    expTableBody.innerHTML = "";

    // Loop through expense data
    data.forEach((item, index) => {

        // Create a new table row
        let newRow = document.createElement('tr');
        newRow.classList.add('addedRow');

        // Insert table cells using template literals
        newRow.innerHTML = `
            <td>${item.ExpenseName}</td>
            <td>${item.Amount}</td>
            <td>${item.Quantity}</td>
            <td>${item.ExpenseCategory}</td>
            <td>${item.ExpenseType}</td>
            <td>${item.Date}</td>
            <td>${item.Amount * item.Quantity}</td>
            <td>
                <button class="delBtn" onclick="delData(${index})">
                    Delete
                </button>
            </td>
        `;

        // Add row to table body
        expTableBody.appendChild(newRow);
    });
}



// Load stored data automatically when page loads
window.onload = function () {
    let storedData = JSON.parse(localStorage.getItem('inputData')) || [];
    renderTable(storedData);
};



// Clears all data from localStorage and table
function clearData() {
    localStorage.removeItem("inputData");
    renderTable([]);
}



// Delete a single expense by index
function delData(index) {

    // Get existing data
    let data = JSON.parse(localStorage.getItem("inputData")) || [];

    // Remove one item at the given index
    data.splice(index, 1);

    // Save updated data
    localStorage.setItem("inputData", JSON.stringify(data));

    // Re-render table
    renderTable(data);

    console.log(data);
}
