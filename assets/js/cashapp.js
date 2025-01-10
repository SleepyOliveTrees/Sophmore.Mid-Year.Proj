document.addEventListener("DOMContentLoaded", () => {
  const totalAmountEl = document.getElementById("total-amount");
  const descriptionEl = document.getElementById("description");
  const amountEl = document.getElementById("amount");
  const dateEl = document.getElementById("date");
  const addButton = document.getElementById("add-button");
  const clearButton = document.getElementById("clear-button");
  const expenseTableBody = document.getElementById("expense-table-body");

  let totalAmount = 0;


  const updateTotal = () => {
    totalAmountEl.textContent = totalAmount.toFixed(2);
    saveData()
  };

  const addExpense = () => {
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);
    const date = dateEl.value;

    if (!description || isNaN(amount) || !date) {
      alert("Please fill out all fields!");
      return;
    }

    totalAmount += amount;


    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${description}</td>
        <td>$${amount.toFixed(2)}</td>
        <td>${date}</td>
        <td><button class="delete-button">Delete</button></td>
      `;


    const deleteButton = row.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      totalAmount -= amount;
      row.remove();
      updateTotal();
      saveData();
    });

    expenseTableBody.appendChild(row);


    descriptionEl.value = "";
    amountEl.value = "";
    dateEl.value = "";

    updateTotal();
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all of your trasactions?"))
      expenseTableBody.innerHTML = "";
    totalAmount = 0;
    updateTotal();
    saveData()
  };

  addButton.addEventListener("click", addExpense);
  clearButton.addEventListener("click", clearAll);


  // this function saves the data by adding the current info inside local storage
  function saveData() {
    const data = {
      totalAmount: totalAmount,
      expenses: expenseTableBody.innerHTML
    };
    localStorage.setItem("data", JSON.stringify(data));
  };
  // shows the stored data 
  function showItem() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      const { totalAmount: savedTotal, expenses } = JSON.parse(savedData);
      totalAmount = savedTotal;
      expenseTableBody.innerHTML = expenses;
      totalAmountEl.textContent = totalAmount.toFixed(2);

      // Reattach delete button functionality
      expenseTableBody.querySelectorAll(".delete-button").forEach((button) => {
        const row = button.parentElement.parentElement;
        const amount = parseFloat(row.children[1].textContent.slice(1));
        button.addEventListener("click", () => {
          totalAmount -= amount;
          row.remove();
          updateTotal();
          saveData();
        });
      });
    }
  }
  showItem();
});