const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: { type: String, default: "https://user-images.githubusercontent.com/112753481/233833426-24f4e71e-0112-4cfa-984a-0d89cfb4db64.png" },
}, { versionKey: false, }
);

const Usermodel = mongoose.model("user", userSchema);
module.exports = { Usermodel };
