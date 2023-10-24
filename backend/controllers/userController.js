const userRouter = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

// Route for adding a new user to the database
userRouter.post("/", async (req, res) => {
  let { password, ...rest } = req.body;
  console.log(req.body);
  console.log(password);
  const user = await User.create({
    ...rest,
    password: await bcrypt.hash(password, 10),
  });
  res.json(user);
});

// Route for getting all users from the database
userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = userRouter;
