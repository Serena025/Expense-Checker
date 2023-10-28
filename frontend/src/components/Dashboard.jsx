import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { getBackendURL } from '../common_functions';
import "../styles/Dashboard.css";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  const url = `${getBackendURL()}/expenses`;
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching expenses');
        }

        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        console.error('Error fetching expenses data:', err);
        setError(err.message);
      }
    };
    fetchExpenses();
  }, [url]);

  useEffect(() => {
    if (expenses.length > 0) {
      const data = generateChartData();
      setChartData(data);
    }
  }, [expenses]);

  const generateChartData = () => {
    const categoryCounts = {};
    for (const expense of expenses) {
      if (categoryCounts[expense.category]) {
        categoryCounts[expense.category] += 1;
      } else {
        categoryCounts[expense.category] = 1;
      }
    }

    return {
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          data: Object.values(categoryCounts),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
          ],
        },
      ],
    };
  };

  return (
    <div>
      {error && <p>Error loading expenses: {error}</p>}
      {chartData && (
        <div style={{ width: '400px', height: '400px' }}>
          <h2>Expense Categories</h2>
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
