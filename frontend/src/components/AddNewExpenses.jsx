import "../styles/Expenses.css";
import { useState, useEffect } from "react";
import { getBackendURL } from "../common_functions";



function AddNewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [updateExpenseData] = useState({});
  const [newExpense, setExpense] = useState({ date: "", amount: 0, source: "", description: "" });

  const url = `${getBackendURL()}/expenses`;
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        
        if (!response.ok) {
          throw new Error("Error fetching Expenses");
        }

        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        console.error("Error fetching expenses data:", err);
        setError(err.message);
      }
    };
    fetchExpenses();
  }, [url]);

  const handleUpdateExpense = async (expenseId, updateData) => {
    try {
      // Send a PUT request to update the Expense
      const response = await fetch(`${url}/${expenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateData), // Use updateData here
      });

      if (!response.ok) {
        throw new Error(`Failed to update expense with ID ${expenseId}`);
      }

      // Assuming that the response contains the updated expense data
      const updateExpense = await response.json();

      // Update your local state with the updated income data
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === updateExpense.id ? updateExpense : expense
        )
      );

      console.log(`Income with ID ${expenseId} updated successfully.`);
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  }

const handleNewExpenseChange = (e) => {
  const { name, value } = e.target;
   setExpense({
    ...newExpense,
    [name]: value,
  });
};

const addNewExpense = async (e) => {
  e.preventDefault();
}
  const handleDeleteExpense = async(expenseId) => {
    try {
      // Send a DELETE request to the server to remove the expense
      const response = await fetch(`${url}/${expenseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete expense with ID ${expenseId}`);
      }

      // Update your local state to reflect the deletion

      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));

      console.log(`Expense with ID ${expenseId} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  return (
    <div className="incomes-1">
      {error && <p>Error loading expenses: {error}</p>}
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr striped>
            <th style={{ border: "1px solid black", padding: "5px" }}>Date</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Amount
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Category
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Subcategory
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Description
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Payment Method
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Is Recurring
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {expense.date}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                ${expense.amount.toFixed(2)}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {expense.category_id}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {expense.subcategory_id}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {expense.description}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {expense.payment_method}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {expense.is_recurring}
              </td>


              <td style={{ border: "1px solid black", padding: "5px" }}>
                <div>
              <button onClick={() => handleUpdateExpense(expense.id, updateExpenseData)}>Update</button>
      <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
      </div>
    </td>
    
            </tr>
          ))}
          
        </tbody>
      </table>

    <div>
    <h3>Add New Expense</h3>
    <div>
      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={newExpense.date}
        onChange={handleNewExpenseChange}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleNewExpenseChange}
        />
      </div>
      <div>
        <label>Source:</label>
        <input
          type="text"
          name="source"
          value={newExpense.source}
          onChange={handleNewExpenseChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={newExpense.description}
          onChange={handleNewExpenseChange}
        />
      </div>
      <button onClick={addNewExpense}>Add Expense</button>
    </div>
  </div>
);
}

export default AddNewExpenses;



