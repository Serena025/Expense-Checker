import "../styles/Income.css";
import { useState, useEffect } from "react";
import { getBackendURL } from "../common_functions";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);
  const [updatedIncomeData] = useState({});
  const [newIncome, setNewIncome] = useState({ date: "", amount: 0, source: "", description: "" });

  const url = `${getBackendURL()}/incomes`;
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        
        if (!response.ok) {
          throw new Error("Error fetching incomes");
        }

        const data = await response.json();
        setIncomes(data);
      } catch (err) {
        console.error("Error fetching incomes data:", err);
        setError(err.message);
      }
    };
    fetchIncomes();
  }, [url]);

  const handleUpdateIncome = async (incomeId, updatedData) => {
    try {
      // Send a PUT request to update the income
      const response = await fetch(`${url}/${incomeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData), // Use updatedData here
      });

      if (!response.ok) {
        throw new Error(`Failed to update income with ID ${incomeId}`);
      }

      // Assuming that the response contains the updated income data
      const updatedIncome = await response.json();

      // Update your local state with the updated income data
      setIncomes((prevIncomes) =>
        prevIncomes.map((income) =>
          income.id === updatedIncome.id ? updatedIncome : income
        )
      );

      console.log(`Income with ID ${incomeId} updated successfully.`);
    } catch (err) {
      console.error("Error updating income:", err);
    }
  }

const handleNewIncomeChange = (e) => {
  const { name, value } = e.target;
  setNewIncome({
    ...newIncome,
    [name]: value,
  });
};

const addNewIncome = async (e) => {
  e.preventDefault();
}
  const handleDeleteIncome = async(incomeId) => {
    try {
      // Send a DELETE request to the server to remove the income
      const response = await fetch(`${url}/${incomeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete income with ID ${incomeId}`);
      }

      // Update your local state to reflect the deletion

      setIncomes((prevIncomes) => prevIncomes.filter((income) => income.id !== incomeId));

      console.log(`Income with ID ${incomeId} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting income:", err);
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
              Source
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <tr key={income.id}>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {income.date}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                ${income.amount.toFixed(2)}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {income.source}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {income.description}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                <div>
              <button onClick={() => handleUpdateIncome(income.id, updatedIncomeData)}>Update</button>
      <button onClick={() => handleDeleteIncome(income.id)}>Delete</button>
      </div>
    </td>
    
            </tr>
          ))}
          
        </tbody>
      </table>

    <div>
    <h3>Add New Income</h3>
    <div>
      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={newIncome.date}
        onChange={handleNewIncomeChange}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={newIncome.amount}
          onChange={handleNewIncomeChange}
        />
      </div>
      <div>
        <label>Source:</label>
        <input
          type="text"
          name="source"
          value={newIncome.source}
          onChange={handleNewIncomeChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={newIncome.description}
          onChange={handleNewIncomeChange}
        />
      </div>
      <button onClick={addNewIncome}>Add Income</button>
    </div>
  </div>
);
}

export default Income;
