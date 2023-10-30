import "../styles/Income.css";
import { useState, useEffect } from "react";
import { getBackendURL } from "../common_functions";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);
  const [updatedIncomeData] = useState({});
  const [newIncome, setNewIncome] = useState({
    date: "",
    amount: 0,
    source: "",
    description: "",
    is_recurring: false,
  });

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
  };

  const handleChangesToIncomeForm = (e) => {
    const { name, value } = e.target;
    setNewIncome({
      ...newIncome,
      [name]: value,
    });
  };

  const handleAddNewIncome = async (e) => {
    e.preventDefault();
    console.log("Income = ", newIncome);
    let fixedUpIncome = {
      ...newIncome,
      amount: parseFloat(newIncome.amount),
    };
    console.log("Fixed up income: ", fixedUpIncome);

    try {
      // Send a POST request to the server to remove the income
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fixedUpIncome),
      });

      if (!response.ok) {
        throw new Error(`Failed to add new income`);
      }

      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
      } else {
        setError(data.message);
      }

      // Update your local state to reflect the deletion
      const newIncomesCopy = [...incomes];
      newIncomesCopy.push(fixedUpIncome);
      setIncomes(newIncomesCopy);

      setNewIncome({
        amount: "",
        source: "",
        description: "",
        date: newIncome.date,
        is_recurring: false,
      });

      console.log(`Income with ID ${data.id} added successfully.`);
    } catch (err) {
      console.error("Error addding income:", err);
    }

    console.log("Got here!");
  };
  const handleDeleteIncome = async (incomeId) => {
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
      setIncomes((prevIncomes) =>
        prevIncomes.filter((income) => income.id !== incomeId)
      );

      console.log(`Income with ID ${incomeId} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting income:", err);
    }
  };

  return (
    <div className="incomes-1">
      {error && <p>Error loading incomes: {error}</p>}
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
                  <button
                    className="update-button"
                    onClick={() =>
                      handleUpdateIncome(income.id, updatedIncomeData)
                    }
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteIncome(income.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-income-group">
        <hr />
        <h3>Add New Income</h3>
        <hr />
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            className="date"
            value={newIncome.date}
            onChange={handleChangesToIncomeForm}
          />
        </div>
        <div>
          <label>Amount:</label>
          <span className="dollarSign">$ </span>
          <input
            type="number"
            name="amount"
            className="amount"
            value={newIncome.amount}
            maxLength={5}
            onChange={handleChangesToIncomeForm}
          />
        </div>
        <div>
          <label>Source:</label>
          <input
            type="text"
            name="source"
            className="source"
            value={newIncome.source}
            onChange={handleChangesToIncomeForm}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            className="description"
            value={newIncome.description}
            onChange={handleChangesToIncomeForm}
          />
        </div>
        <hr />
        <button onClick={handleAddNewIncome}>Submit</button>
      </div>
    </div>
  );
}

export default Income;
