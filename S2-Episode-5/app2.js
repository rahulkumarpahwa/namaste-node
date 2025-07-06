const express = require("express");
const app = express();
const getToken = () => {
  return "aa1";
};

// app.get("/admin/getallusers", (req, res) => {
//   // this is way we auth. admin. Now if the have multiple route handler like that it will have to auth every time and this will call the method get token everytime which is load on the app and so here the middlewares comes to handle all this.
//   const token = getToken();
//   const authorized = () => {
//     return token === "aaa";
//   };
//   if (authorized()) {
//     res.send("All users data");
//   } else {
//     res.status(401).send("Unauthorized aadmin");
//   }
// });

// //case 2: above using the middlewares as:
// app.use("/admin", (req, res, next) => {
//   // now this middleware will handle all the routes which start with "/admin" for all HTTP methods like GET, PUT, POST..etc and check that admin is valid or not then call the further methods related to it.
//   const token = getToken();
//   const authorized = () => {
//     return token === "aaa";
//   };
//   if (authorized()) {
//     console.log("Authorized!");
//     next();
//   } else {
//     res.status(401).send("Unauthorized admin");
//   }
// });

// app.get("/admin/getallusers", (req, res) => {
//   res.send("All users data");
// });

// case 3 : we can create a folder middlewares inside the src and put all the functions of the middlewares inside the file and import from their as:
const { adminAuth } = require("./middlewares/auth.js");

app.use("/admin", adminAuth);

app.get("/admin/getallusers", (req, res) => {
  res.send("All users data");
});

// // case 4 : we can authorized the user as well:
// const { userAuth } = require("./middlewares/auth.js");
// app.use("/users", userAuth);
// app.get("/users", (req, res) => {
//   res.send("profile data of the user");
// });


// case 5 : we can write case 4 as:
const { userAuth } = require("./middlewares/auth.js");
app.get("/users", userAuth, (req, res) => {
  res.send("profile data of the user");
});

const port = 8000;

app.listen(port, () => {
  console.log(`server is successfully listening at port ${port}`);
});
