import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { getBackendURL } from '../common_functions';
import '../styles/Dashboard.css';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${getBackendURL()}/expenses`, {
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      const categoryCounts = {};
      for (const expense of expenses) {
        if (categoryCounts[expense.category]) {
          categoryCounts[expense.category] += 1;
        } else {
          categoryCounts[expense.category] = 1;
        }
      }
      const data = [['Category', 'Count']];
      for (const category in categoryCounts) {
        data.push([category, categoryCounts[category]]);
      }
      setChartData(data);
    }
  }, [expenses]);

  return (
    <div>
      {error && <p>Error loading expenses: {error}</p>}
      {chartData && (
        <div style={{ width: '800px', height: '600px' }}>
          <h2>Expense Categories</h2>
          <Chart
            chartType="PieChart"
            width="100%"
            height="100%"
            data={chartData}
            options={{
              title: 'Expense Categories',
              is3D: true,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
