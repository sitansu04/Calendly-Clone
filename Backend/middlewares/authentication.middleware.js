const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.key);
      if (decoded) {
        const userID = decoded.userID;
        req.body.userID = userID;
        next();
      } else {
        res.send("Please Login first");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } else {
    res.send(`Please Login`);
  }
};
module.exports = {
  authenticate,
};
