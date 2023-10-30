import "../styles/Expenses.css";
import { useState, useEffect } from "react";
import { getBackendURL } from "../common_functions";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [newExistingExpense, setNewExistingExpense] = useState({
    date: "",
    amount: 0,
    source: "",
    description: "",
    category_id: 23,
    subcategory_id: 88,
    recipient: "",
    payment_method: "",
    is_recurring: false,
  });
  const [editExpense, setEditExpense] = useState(false);
  const [allcategories, setAllCategories] = useState([]);
  const [subcategoriesForCategory, setSubcategoriesForCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

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
          throw new Error("Error fetching expenses");
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

  const handleUpdateExpense = async (expenseId) => {
    try {
      // Send a Get request to fetch the expense
      const response = await fetch(`${url}/${expenseId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch expense with ID ${expenseId}`);
      }

      const data = await response.json();
      console.log("ESH - Existing expense: ", data);
      setEditExpense(true);
      setNewExistingExpense(data);
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  const handleChangesToExpenseForm = (e) => {
    const { name, value } = e.target;
    setNewExistingExpense({
      ...newExistingExpense,
      [name]: value,
    });
  };

  const handleSubmitAddEditExpense = async (e) => {
    e.preventDefault();
    console.log("Expense = ", newExistingExpense);
    let fixedUpExpense = {
      ...newExistingExpense,
      amount: parseFloat(newExistingExpense.amount),
    };
    console.log("ESH 2 - Fixed up expense: ", fixedUpExpense);

    try {
      let response = null;
      let data = null;
      if (editExpense) {
        // Send a PUT request to update the expense
        response = await fetch(`${url}/${newExistingExpense.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(fixedUpExpense),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to update expense with ID ${newExistingExpense.id}`
          );
        }

        // Assuming that the response contains the updated expense data
        const updatedExpense = await response.json();

        // Update your local state with the updated expense data
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === updatedExpense.id ? updatedExpense : expense
          )
        );

        console.log(
          `Expense with ID ${newExistingExpense.id} updated successfully.`
        );
      } else {
        // Send a POST request to the server to add the expense
        response = await fetch(`${url}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fixedUpExpense),
        });

        if (!response.ok) {
          throw new Error(`Failed to add new expense`);
        }

        data = await response.json();
        if (response.status === 200) {
          console.log(data);

          // Update your local state to reflect the addition
          const newExpensesCopy = [...expenses];
          newExpensesCopy.push(data);
          setExpenses(newExpensesCopy);
          console.log(`Expense with ID ${data.id} added successfully.`);
        } else {
          setError(data.message);
        }
      }

      setEditExpense(false);
      setNewExistingExpense({
        amount: "",
        source: "",
        description: "",
        date: newExistingExpense.date,
        is_recurring: false,
      });
    } catch (err) {
      console.error("Error addding expense:", err);
    }
  };
  const handleDeleteExpense = async (expenseId) => {
    try {
      console.log(expenseId);
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

      // Update local state to reflect the deletion
      setExpenses((prevIncomes) =>
        prevIncomes.filter((expense) => expense.id !== expenseId)
      );

      console.log(`Expense with ID ${expenseId} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  return (
    <div className="expenses-1">
      <h2>Expenses</h2>
      {error && <p>Error loading expenses: {error}</p>}
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr striped>
            <th style={{ border: "1px solid black", padding: "5px" }}>Date</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Amount
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Recipient/Merchant
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Description
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
                {expense.recipient}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {expense.description}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                <div>
                  <button
                    className="update-button"
                    onClick={() => handleUpdateExpense(expense.id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-expense-group">
        <hr />
        <h3>{editExpense ? "Edit Existing Expense" : "Add New Expense"}</h3>
        <hr />
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            className="date"
            value={newExistingExpense.date}
            onChange={handleChangesToExpenseForm}
          />
        </div>
        <div>
          <label>Amount:</label>
          <span className="dollarSign">$ </span>
          <input
            type="number"
            name="amount"
            className="amount"
            value={newExistingExpense.amount}
            maxLength={5}
            onChange={handleChangesToExpenseForm}
          />
        </div>
        <div>
          <label>Recipient/Merchant:</label>
          <input
            type="text"
            name="recipient"
            className="recipient"
            value={newExistingExpense.recipient}
            onChange={handleChangesToExpenseForm}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            className="description"
            value={newExistingExpense.description}
            onChange={handleChangesToExpenseForm}
          />
        </div>
        <hr />
        <button onClick={handleSubmitAddEditExpense}>Submit</button>
      </div>
    </div>
  );
}

export default Expenses;
