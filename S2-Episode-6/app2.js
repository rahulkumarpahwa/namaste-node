const express = require("express");
const app = express();
const { connectDB } = require("./config/database.js");
const { User } = require("./models/userSchema.js");
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












// we will put the app.listen in the then() method of the database.
// const port = 8000;
// app.listen(port, () => {
//   console.log(`server is successfully listening at port ${port}`);
// });
