//? ALL THE PACKAGES
const { connection } = require("./config/db.js");
const cookieSession = require("cookie-session")
const passport = require("passport");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

//? ALL THE ROUTERS
const { WorkFlowRouter } = require("./routes/workflow.route.js");
const { GoogleRouter } = require("./routes/GoogleAuth.route.js");
const { EventRouter } = require("./routes/event.route.js");
const { userRouter } = require("./routes/user.route.js");
const FacebookRouter = require("./routes/FacebookAuth.route.js");


const app = express();


app.use(express.json());

//? HANDLING CROSS ORIGIN
app.use(cors({
  origin: "https://mycal-704.netlify.app",
  mehtods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', "UserEmail", "collection", "Authorization", "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin"],
  credentials: true
}));

//? Maintaining Login Session
app.use(cookieSession({
  name: 'google-auth-session',
  keys: ["key1", "key2"],
}))

//? Passport Middlewares 
app.use(passport.initialize())
app.use(passport.session())

//? ROUTES
app.use("/google", GoogleRouter)
app.use("/facebook", FacebookRouter)
app.use("/users", userRouter);
app.use("/events", EventRouter);
app.use("/workflow", WorkFlowRouter)

//? BASIC ROUTE
app.get("/", (req, res) => {
  try {
    res.json({ Message: "Welcome to MyCal App" });
  } catch (err) {
    console.log(err);
    res.json({ Error: err })
  }
});

//? LISTNEING TO SERVER
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error connecting to DB");
  }
  console.log(`Server is Rocking on port ${process.env.PORT}`);
});
