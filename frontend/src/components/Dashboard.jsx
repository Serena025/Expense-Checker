import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { getBackendURL } from "../common_functions";
import "../styles/Dashboard.css";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState({});
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [totalExpenses, setTotalAmountSpent] = useState(0);
  const [chartType, setChartType] = useState("PieChart");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchFieldsChanged, setSearchFieldsChanged] = useState(true);

  const handleChartTypeChange = (e) => {
    const newValue = e.target.value;
    setChartType(newValue);
    console.log(`New chart type value: ${newValue}`);
  };

  const handleCategoryChange = (e) => {
    const newValue = e.target.value;
    setSelectedCategory(newValue);
    setSearchFieldsChanged(true);
    console.log(`New category value: ${newValue}`);
  };

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
      }

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
      setSearchFieldsChanged(false);
    } catch (e) {}
  }, [searchFieldsChanged]);

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
        console.log("----------");
      }
      searchFieldsChanged = false;
    } catch (e) {}
  }, [searchFieldsChanged]);

  return (
    <div>
      {error && <p>Error loading expenses: {error}</p>}
      <div class="parameters">
        <label for="chartType">Choose a chart type:</label>
        <select
          value={chartType}
          onChange={handleChartTypeChange}
          name="chartType"
          id="chartType"
        >
          <option value="Bar">Bar</option>
          <option value="PieChart">Pie Chart</option>
        </select>

        <label for="selectedCategory">Choose a category:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          name="selectedCategory"
          id="selectedCategory"
        >
          <option value="">All</option>
          <option value="14">Housing</option>
          <option value="15">Food</option>
        </select>
      </div>
      <hr />
      <h5>Total Expenses: ${totalExpenses.toFixed(2)} </h5>
      <hr />
      {chartData && (
        <div
          style={{ width: "600px", height: "450px", margin: "0", padding: "0" }}
        >
          <h5>Expense Breakdown</h5>
          <Chart
            chartType={chartType}
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
      <hr />
    </div>
  );
}

export default Dashboard;
