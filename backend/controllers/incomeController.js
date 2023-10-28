const incomeRouter = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");

const { Income } = db;

// Gets the list of all incomes for a user
incomeRouter.get("/", async (req, res) => {
  if (req.currentUser) {
    let incomes = await Income.findAll({
      where: { user_id: req.currentUser.user_id },
    });

    if (!incomes) {
      res.status(404).json({
        message: `Income could not be retrieved. Reason: Unknown`,
      });
    } else {
      res.status(200).json(incomes);
    }
  } else {
    res.status(404).json({
      message: `Income could not be retrieved. Reason: User not logged in`,
    });
  }
});

// Gets an individual income for a user
incomeRouter.get("/:id", async (req, res) => {
  if (req.currentUser) {
    let incomeID = Number(req.params.id);
    if (isNaN(incomeID)) {
      res.status(404).json({
        message: `Income could not be retrieved. Reason: Invalid id ${incomeID}`,
      });
    } else {
      const income = await Income.findOne({
        where: { id: incomeID },
      });

      if (!income) {
        res.status(404).json({
          message: `Income could not be retrieved. Reason: Database error`,
        });
      } else {
        res.json(income);
      }
    }
  } else {
    res.status(404).json({
      message: `Income could not be retrieved. Reason: User not logged in`,
    });
  }
});

// Post an income for a user
incomeRouter.post("/", async (req, res) => {
  if (req.currentUser) {
    let new_income = await Income.create({
      user_id: req.currentUser.user_id,
      ...req.body,
    });

    if (!new_income) {
      res.status(404).json({
        message: `Income could not be posted. Reason: Database error`,
      });
    } else {
      res.status(200).json(new_income);
    }
  } else {
    res.status(404).json({
      message: `Income could not be posted. Reason: User not logged in`,
    });
  }
});

// Update an existing income
incomeRouter.put("/:id", async (req, res) => {
  if (req.currentUser) {
    console.log(req.body);
    let incomeID = Number(req.params.id);
    if (isNaN(incomeID)) {
      res.status(404).json({
        message: `Income could not be updated. Reason: Invalid id ${incomeID}`,
      });
    } else {
      const income = await Income.findOne({
        where: { id: incomeID },
      });

      if (!income) {
        res.status(404).json({
          message: `Income could not be updated. Reason: Could not find any income with given id`,
        });
      } else {
        Object.assign(income, req.body);
        await income.save();
        console.log("Updated income with id", incomeID);
        res.json(income);
      }
    }
  } else {
    res.status(404).json({
      message: `Income could not be updated. Reason: User not logged in`,
    });
  }
});

// Delete an income from the table
incomeRouter.delete("/:id", async (req, res) => {
  if (req.currentUser) {
    console.log(req.body);
    let incomeID = Number(req.params.id);
    if (isNaN(incomeID)) {
      res.status(404).json({
        message: `Income could not be deleted. Reason: Invalid id ${incomeID}`,
      });
    } else {
      const income = await Income.findOne({
        where: { id: incomeID },
      });

      if (!income) {
        res.status(404).json({
          message: `Income could not be deleted. Reason: Could not find any income with given id`,
        });
      } else {
        await income.destroy();
        console.log("Deleted income with id", incomeID);
        res.json(income);
      }
    }
  } else {
    res.status(404).json({
      message: `Income could not be updated. Reason: User not logged in`,
    });
  }
});

module.exports = incomeRouter;
