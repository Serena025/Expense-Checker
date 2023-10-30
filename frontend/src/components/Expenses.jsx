import "../styles/Expenses.css";
import { useState, useEffect } from "react";
import { getBackendURL } from "../common_functions";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

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
  }, []);

  return (
    <div className="expenses-1">
      {error && <p>Error loading expenses: {error}</p>}
      <h2>Expenses</h2>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr striped>
            <th style={{ border: "1px solid black", padding: "5px" }}>Date</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Amount
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Recipient / Merchant
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Expenses;
