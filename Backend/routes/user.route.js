const express = require("express");
const { Usermodel } = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
// ! USER REGISTER
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const User = await Usermodel.findOne({ email: email });
  if (!User) {
    try {
      bcrypt.hash(password, 5, async (err, secure_pass) => {
        if (err) {
          console.log(err);
        } else {
          const user = new Usermodel({
            name,
            email,
            password: secure_pass,
          });
          await user.save();
          console.log(user);//!-----> User Created
          res.json({ Messsage: `${user.name} has been Registered` });
        }
      });
      // });
    } catch (error) {
      console.log(error);
      res.status(500).json({ Message: error });
    }
  } else {
    res.json({ Message: `Email is already exists` });
  }
});
//! USER LOGIN
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.findOne({ email });
    const hash = user.password;
    console.log(user);
    if (user) {
      bcrypt.compare(password, hash, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, process.env.key);
          const refresh_token = jwt.sign(
            { userID: user._id },
            process.env.refresh_key
          );
          res.json({ Message: "Login succesfull", token, refresh_token, name: user.name, email, success: true });
        } else {
          res.json({ Message: "Login failed", success: false });
        }
      });
    } else {
      res.json({ Message: "Wrong Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ Err: error });
  }
});
//! GET USER BY ID
userRouter.get('/:id', async (req, res) => {
  let userID = req.params.id
  let user = await Usermodel.findOne({ _id: userID });
  jwt.sign({ user }, process.env.key, (err, token) => {
    if (token) {
      res.json({
        Message: "Login Successful",
        Wrong: false, token, user,
      });
    } else {
      res.json({ Message: "JWT error", Wrong: true });
    }
  });
})

module.exports = {
  userRouter,
};
