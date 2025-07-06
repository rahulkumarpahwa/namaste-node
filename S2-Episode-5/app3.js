const express = require("express");
const app = express();

// error handling
// sometime your code may have the error or the database logic gets any error in such cases (we show it here by throwing a error) to handle errors we can do either using 1. try catch 2. app.use("/", (err, req, res, next))

// 1. try-catch :
// app.get("/getuserdata", (req, res) => {
//   try {
//     throw new Error("this is a random error generated!");
//     res.send("data of the user");
//   } catch (error) {
//     // res.status(500).send(error.message + error.name + error.stack);
//     res.status(500).send(error.message);
//   }
// });

app.get("/getuserdata", (req, res) => {
  throw new Error("this is a random error generated!");
  res.send("data of the user");
});

//2. app.use("/") way : write it at the end.
// why "/" route as all the routes start with "/" that's why. also err should be the first parameter.
app.use("/", (err, req, res, next) => {
  // ORDER OF PARAMETERS MATTER HERE.
  if (err) {
    //res.status(500).send(error.message + error.name + error.stack);
    res.status(500).send(err.message);
  } else {
    res.redirect("/");
  }
});
// we can log the errors as well or alert the client as well.

const port = 8000;

app.listen(port, () => {
  console.log(`server is successfully listening at port ${port}`);
});
