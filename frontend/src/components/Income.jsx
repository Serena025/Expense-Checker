import "../styles/Income.css";
import { useState, useEffect } from "react";
import { getBackendURL } from "../common_functions";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);

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
  }, []);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Income;
