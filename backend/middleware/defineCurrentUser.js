const db = require("../models");
const jwt = require("json-web-token");

const { User } = db;

async function defineCurrentUser(req, res, next) {
  try {
    const [method, token] = req.headers.authorization.split(" ");
    if (method == "Bearer") {
      const result = await jwt.decode(process.env.JWT_SECRET, token);
      console.log(result);
      const { id } = result.value;
      if (id) {
        let user = await User.findOne({
          where: {
            userId: id,
          },
        });

        if (user) {
          req.currentUser = user;
          console.log("ESH 1 => User: ", user);
        } else {
          console.log("ESH 2 => No User");
          req.currentUser = null;
        }
      } else {
        console.log("ESH 3 => No User");
        req.currentUser = null;
      }
    }
    next();
  } catch (err) {
    console.log("ESH 4 => No User. Error => ", err);
    req.currentUser = null;
    next();
  }
}

module.exports = defineCurrentUser;
