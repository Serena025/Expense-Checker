const authenticationRouter = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");

const { User } = db;

// Route for getting the username
authenticationRouter.post("/", async (req, res) => {
  try {
    let user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(404).json({
        message: `Could not find a user with the provided username and password`,
      });
    } else {
      const result = await jwt.encode(process.env.JWT_SECRET, {
        username: user.username,
      });
      res.json({
        user: user,
        token: result.value,
        message: "Login Successful",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: `Server error`,
    });
  }
});

authenticationRouter.get("/profile", async (req, res) => {
  try {
    res.json(req.currentUser);
  } catch {
    res.status(500).json({
      message: `Server error getting profile`,
    });
  }
});

module.exports = authenticationRouter;
