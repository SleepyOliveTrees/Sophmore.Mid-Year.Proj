// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Element selectors
    const totalAmountEl = document.getElementById("total-amount");
    const descriptionEl = document.getElementById("description");
    const amountEl = document.getElementById("amount");
    const dateEl = document.getElementById("date");
    const addButton = document.getElementById("add-button");
    const clearButton = document.getElementById("clear-button");
    const expenseTableBody = document.getElementById("expense-table-body");
  
    let totalAmount = 0; // Initialize total amount
  
    // Function to update total amount displayed
    const updateTotal = () => {
      totalAmountEl.textContent = totalAmount.toFixed(2);
    };
  
    // Function to add a new expense
    const addExpense = () => {
      const description = descriptionEl.value.trim();
      const amount = parseFloat(amountEl.value);
      const date = dateEl.value;
  
      if (!description || isNaN(amount) || !date) {
        alert("Please fill out all fields!");
        return;
      }
  
      totalAmount += amount;
  
      // Create a new row for the table
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${description}</td>
        <td>$${amount.toFixed(2)}</td>
        <td>${date}</td>
        <td><button class="delete-button">Delete</button></td>
      `;
  
      // Add delete functionality to the new row
      const deleteButton = row.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
        totalAmount -= amount;
        row.remove();
        updateTotal();
      });
  
      expenseTableBody.appendChild(row); // Append the row to the table
  
      // Clear input fields
      descriptionEl.value = "";
      amountEl.value = "";
      dateEl.value = "";
  
      updateTotal(); // Update the total amount
    };
  
    // Function to clear all expenses
    const clearAll = () => {
      expenseTableBody.innerHTML = ""; // Clear table body
      totalAmount = 0; // Reset total amount
      updateTotal(); // Update the displayed total
    };
  
    // Event listeners for buttons
    addButton.addEventListener("click", addExpense);
    clearButton.addEventListener("click", clearAll);
  });