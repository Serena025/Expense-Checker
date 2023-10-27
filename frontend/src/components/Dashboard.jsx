import React from 'react';
import Table from 'react-bootstrap/Table';
import "../styles/Dashboard.css";



const expenses = [
  { id: 1, description: 'Rent', amount: 1000, date: '2023-09-01' },
  { id: 2, description: 'Groceries', amount: 100, date: '2023-09-05' },
  { id: 3, description: 'Internet Bill', amount: 50, date: '2023-09-10' },
  { id: 4, description: 'Dinner', amount: 200, date: '2023-09-15' },
]


function Dashboard() {
    return (
      <div>        
        <h2>Dashboard</h2>
        <table style={{ border: '1px solid black' }}>
        <thead>
          <tr striped>
            <th style={{ border: '1px solid black', padding: '5px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Description</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Amount</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{expense.id}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{expense.description}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{expense.amount}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }

  export default Dashboard;