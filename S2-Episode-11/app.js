const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database.js");
const secret = "jhfsdfhshfsfhhfjahfkasfhk"; // any random secret for the jwt. can put as env as well.
const port = 8000;

connectDB()
  .then(() => {
    console.log("database connected successfully!");
    app.listen(port, () => {
      console.log(`server is successfully listening at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use(cookieParser()); // parsing the cookies.

// make sure to put these after the parser.
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

// like the middlewares, we pass the routers
app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);