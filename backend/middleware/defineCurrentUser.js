const db = require("../models");
const jwt = require("json-web-token");

const { User } = db;

async function defineCurrentUser(req, res, next) {
  console.log("ESHITA: got here 1");
  console.log(req.headers.authorization);

  try {
    const [method, token] = req.headers.authorization.split(" ");
    console.log(method, token);
    if (method == "Bearer") {
      console.log("Got here!");
      const result = await jwt.decode(process.env.JWT_SECRET, token);
      const { id } = result.value;
      let user = await User.findOne({
        where: {
          userId: id,
        },
      });
      req.currentUser = user;
    }
    next();
  } catch (err) {
    req.currentUser = null;
    next();
  }
}

module.exports = defineCurrentUser;
