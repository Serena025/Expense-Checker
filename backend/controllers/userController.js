const userRouter = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

// Route for adding a new user to the database
userRouter.post("/", async (req, res) => {
  try {
    let { password, ...rest } = req.body;
    console.log(req.body);
    console.log(password);
    const user = await User.create({
      ...rest,
      password: await bcrypt.hash(password, 10),
    });
    res.json(user);
  } catch (e) {
    res
      .status(500)
      .json({ message: `Could not add user. Reason: Server Error` });
  }
});

// Route for getting all users from the database
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    res
      .status(500)
      .json({ message: `Could not get all users. Reason: Server Error` });
  }
});

module.exports = userRouter;
