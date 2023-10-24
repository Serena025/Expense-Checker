const expenseRouter = require("express").Router();
const db = require("../models")

// Gets the list of all expenses
expenseRouter.get("/", async (req, res) => {
  const expenses = [
    {
      id: 1,
      category: "Housing",
      subcategory: "Mortgage",
      recurring: true,
      amount: 1730.0,
    },
    {
      id: 2,
      category: "Car",
      subcategory: "N/A",
      recurring: true,
      amount: 260.0,
    },
  ];

  res.json(expenses);
});

// Adds a new expense

// Gets an individual expense by id

// Route for updating an expense

// Route for deleting an expense

module.exports = expenseRouter;
