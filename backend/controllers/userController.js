const userRouter = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

// Route for adding a new user to the database
router.post("/", async (req, res) => {
  let { password, ...rest } = req.body;
  const user = await User.create({
    ...rest,
    password: await bcrypt.hash(password, 10),
  });
  res.json(user);
});

// Route for getting all users from the database
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = userRouter;
