// Require needed modules.
const express = require("express");
const cors = require("cors");

// Initialize the app
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Create a homepage route.
app.get("/", function (req, res) {
  res.send("Backend for Budget Buddy");
});

// Income Route
const incomeController = require("./controllers/incomeController");
app.use("/incomes", incomeController);
// Expense Route
const expenseController = require("./controllers/expenseController");
app.use("/expenses", expenseController);
// Category Route
const categoryController = require("./controllers/categoryController");
app.use("/categories", categoryController);
// Users Route
const userController = require("./controllers/userController");
app.use("/users", userController);

// Group Members
app.get("/members", function (req, res) {
  const group_members = [
    { name: "Adrian Mitre" },
    { name: "David Aguirre" },
    { name: "Eshita Islam" },
    { name: "Marisol Valenzuela" },
    { name: "Serena Ally" },
  ];

  res.json(group_members);
});

// Listen for connections.
app.listen(process.env.PORT, function () {
  console.log("Backend server is running");
});
