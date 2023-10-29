import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { getBackendURL } from "../common_functions";
import "../styles/Dashboard.css";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState({});
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${getBackendURL()}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching categories");
      }

      const data = await response.json();

      let newCategories = {};
      for (let index in data) {
        let category = data[index];
        newCategories[category.id] = category;
        console.log(index);
      }
      console.log(newCategories);

      setCategories(newCategories);
    } catch (err) {
      console.error("Error fetching categories data:", err);
      setError(err.message);
    }
  };

  const fetchExpensesData = async () => {
    try {
      const response = await fetch(`${getBackendURL()}/expenses`, {
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

  useEffect(() => {
    try {
      fetchCategories();
      fetchExpensesData();
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      if (expenses.length > 0) {
        let amountSpent = 0;
        let spendCategories = {};
        for (const expense of expenses) {
          amountSpent += expense.amount;
          if (spendCategories[expense.category_id]) {
            spendCategories[expense.category_id] += expense.amount;
          } else {
            spendCategories[expense.category_id] = expense.amount;
          }
        }
        setTotalAmountSpent(amountSpent);
        const data = [["Category", "Count"]];
        for (const category_id in spendCategories) {
          let category = categories[category_id];
          let amountSpent = spendCategories[category_id];
          let label = `${category.name}: $${amountSpent}`;
          console.log(category.name, amountSpent);
          data.push([label, amountSpent]);
        }
        setChartData(data);
      }
    } catch (e) {}
  }, [expenses, categories]);

  return (
    <div>
      {error && <p>Error loading expenses: {error}</p>}
      {chartData && (
        <div
          style={{ width: "600px", height: "450px", margin: "0", padding: "0" }}
        >
          <h5>Total Expenses: ${totalAmountSpent.toFixed(2)} </h5>
          <h5>Expense Breakdown</h5>
          <Chart
            chartType="PieChart"
            width="100%"
            height="100%"
            data={chartData}
            options={{
              title: "Expenses by Category",
              is3D: true,
              dataLabels: "value",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
