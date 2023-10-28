import React, { useState } from 'react';



function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense= () => {
    if (description && amount) {
      const newExpense = {
        description: description,
        amount: parseFloat(amount),
      };
      setExpenses([...expenses, newExpense]);
      setDescription('');
      setAmount('');
    }
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
      <h2>Expense Calculator</h2>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <div>
        <h3>Expenses</h3>
        <table style={{ border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '5px' }}>Description</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '5px' }}>{expense.description}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total: ${totalExpenses}</p>
      </div>
    </div>
  );
};


export default Dashboard