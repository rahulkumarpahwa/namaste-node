const express = require("express");
const app = express();

// https://github.com/pillarjs/path-to-regexp#errors, read the document for the changes in the route path.

// * means any no of wildcard characters in between.
// app.get("/ab*c", (req, res) => {
//   res.send({ "name": "appple", age: 35 });
// });

// regex 
// app.get(/a/, (req, res) => {
//   res.send({ "name ": "appple", age: 35 });
// });

// //regex: starting with character between a to z
// app.get(/[a-z]/, (req, res) => {
//   res.send({ "name ": "appple", age: 35 });
// });

// //regex : ending with 'fly'
// app.get(/.*fly$/, (req, res) => {
//   res.send({ "name ": "appple", age: 35 });
// });


// query in the request using the ?
app.get("/queryroute" , (req, res)=>{
console.log(req.query); // this will print the query object
res.send(req.query);
});

// /queryroute?apple=best
// {
//     "apple": "best"
// }


// parameter in the request using the : symbol
app.get("/paramsroute/:paramOne" , (req, res)=>{
console.log(req.params); // this will print the params object 
res.send(req.params);
});

// {
//     "paramOne": "apple"
// }


app.get("/user", (req, res) => {
  res.send({ "name ": "appple", age: 35 });
});
 
const port = 8000;

app.listen(port, () => {
  console.log(`server is successfully listening at port ${port}`);
});
