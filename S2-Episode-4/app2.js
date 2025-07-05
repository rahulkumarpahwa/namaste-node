const express = require("express");
const app = express();

app.use("/user", (req, res) => {
  res.send(
    "this will get executed because the USE() handle all the requests and also the order matters. if i put it after the GET, POST, DELETE then these route will work and use will not get the request."
  );
});

app.get("/user", (req, res) => {
  res.send({ name: "apple", age: 35 });
});

app.post("/user", (req, res) => {
  console.log("Your data is saved!");
  res.send("Your data has been saved!");
});

app.delete("/user", (req, res) => {
  console.log("user deleted successfully");
  res.send("user has been deleted");
});

// this will only handle the get request to the /start route and not further.
app.get("/start", (req, res) => {
  res.send({ start: "this is the start message" });
});

// this will handle all the request to the /test route.
// app.use("/a", (req, res) => { // any route with path /a/<<anything>> will return the result here.
//   res.send("Hello from A server!");
// });

// app.use("/", (req, res) => { // this will override the every route. this acts as a wild card. Anything that matches after the /, will be handles by the above the function.
//   res.send("Namaste World!");
// });

// app.use((req, res) => {
//   res.send("Hello from server!");
// });

const port = 8000;

app.listen(port, () => {
  console.log(`server is successfully listening at port ${port}`);
});
