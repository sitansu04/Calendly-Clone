const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', false);


const connection = mongoose.connect(process.env.mongoURL);
module.exports = { connection };
