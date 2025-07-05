const express = require("express");
const app = express();

// https://github.com/pillarjs/path-to-regexp#errors, read the document for the changes in the route path.

// * means any no of wildcard characters in between.
app.get("/ab*c", (req, res) => {
  res.send({ "name": "appple", age: 35 });
});

app.get("/user", (req, res) => {
  res.send({ "name ": "appple", age: 35 });
});
 
const port = 8000;

app.listen(port, () => {
  console.log(`server is successfully listening at port ${port}`);
});
