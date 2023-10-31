const expenseRouter = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");

const { Expense } = db;

// Gets the list of all expenses for a user
expenseRouter.get("/", async (req, res) => {
  try {
    if (req.currentUser) {
      let conditions = { user_id: req.currentUser.user_id };

      // Add category id if present
      if (req.query.category_id) {
        conditions.category_id = req.query.category_id;
      }

      // Add dates
      if (req.query.from_date && req.query.to_date) {
        console.log("From date", req.query.from_date);
        console.log("To date", req.query.to_date);
        conditions.date = {
          [Op.between]: [
            new Date(req.query.from_date),
            new Date(req.query.to_date),
          ],
        };
      } else if (req.query.from_date) {
        console.log("From date", req.query.from_date);
        conditions.date = {
          [Op.gte]: new Date(req.query.from_date),
        };
      } else if (req.query.to_date) {
        console.log("To date", req.query.to_date);
        conditions.date = {
          [Op.lte]: new Date(req.query.to_date),
        };
      }

      console.log(conditions);

      // Fetch the expenses based on conditions
      let expenses = await Expense.findAll({
        where: conditions,
      });

      if (!expenses) {
        res.status(404).json({
          message: `Expense could not be retrieved. Reason: Unknown`,
        });
      } else {
        res.status(200).json(expenses);
      }
    } else {
      res.status(404).json({
        message: `Expense could not be retrieved. Reason: User not logged in`,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: `Expenses could not be retrieved. Reason: Server Error`,
    });
  }
});

// Gets an individual expense for a user
expenseRouter.get("/:id", async (req, res) => {
  try {
    if (req.currentUser) {
      let expenseID = Number(req.params.id);
      if (isNaN(expenseID)) {
        res.status(404).json({
          message: `Expense could not be retrieved. Reason: Invalid id ${expenseID}`,
        });
      } else {
        const expense = await Expense.findOne({
          where: { id: expenseID },
        });

        if (!expense) {
          res.status(404).json({
            message: `Expense could not be retrieved. Reason: Database error`,
          });
        } else {
          res.json(expense);
        }
      }
    } else {
      res.status(404).json({
        message: `Expense could not be retrieved. Reason: User not logged in`,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: `Individual Expense could not be retrieved. Reason: Server Error`,
    });
  }
});

// Post an expense for a user
expenseRouter.post("/", async (req, res) => {
  try {
    if (req.currentUser) {
      let new_expense = await Expense.create({
        user_id: req.currentUser.user_id,
        ...req.body,
      });

      if (!new_expense) {
        res.status(404).json({
          message: `Expense could not be posted. Reason: Database error`,
        });
      } else {
        res.status(200).json(new_expense);
      }
    } else {
      res.status(404).json({
        message: `Expense could not be posted. Reason: User not logged in`,
      });
    }
  } catch (e) {
    console.log("ESH - Expense error", e);
    res.status(500).json({
      message: `Expense could not be posted. Reason: Server error`,
    });
  }
});

// Update an existing expense
expenseRouter.put("/:id", async (req, res) => {
  try {
    if (req.currentUser) {
      console.log(req.body);
      let expenseID = Number(req.params.id);
      if (isNaN(expenseID)) {
        res.status(404).json({
          message: `Expense could not be updated. Reason: Invalid id - ${expenseID}`,
        });
      } else {
        const expense = await Expense.findOne({
          where: { id: expenseID },
        });

        if (!expense) {
          res.status(404).json({
            message: `Expense could not be updated. Reason: Could not find any expense with given id`,
          });
        } else {
          Object.assign(expense, req.body);
          await expense.save();
          console.log("Updated expense with id", expenseID);
          res.json(expense);
        }
      }
    } else {
      res.status(404).json({
        message: `Expense could not be updated. Reason: User not logged in`,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: `Expense could not be updated. Reason: Server error`,
    });
  }
});

// Delete an expense from the table
expenseRouter.delete("/:id", async (req, res) => {
  try {
    if (req.currentUser) {
      console.log(req.body);
      let expenseID = Number(req.params.id);
      if (isNaN(expenseID)) {
        res.status(404).json({
          message: `Expense could not be deleted. Reason: Invalid id ${expenseID}`,
        });
      } else {
        const expense = await Expense.findOne({
          where: { id: expenseID },
        });

        if (!expense) {
          res.status(404).json({
            message: `Expense could not be deleted. Reason: Could not find any expense with given id`,
          });
        } else {
          await expense.destroy();
          console.log("Deleted expense with id", expenseID);
          res.json(expense);
        }
      }
    } else {
      res.status(404).json({
        message: `Expense could not be updated. Reason: User not logged in`,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: `Expense could not be updated. Reason: Server error`,
    });
  }
});

module.exports = expenseRouter;
