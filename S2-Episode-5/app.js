const express = require("express");
const app = express();

// route handler
// app.use("/user", (req, res) => {
//   // route handler
//   // without response the request will get keep on waiting for the response until timeout occurs.
//   // res.send("apple");
// });

// we can pass multiple route handler callback functions.
// app.use(
//   "/user",
//   (req, res, next) => {
//     // route handler
//     console.log("this is first route handler.");
//     // res.send("apple"); // this first one will be send back and request does not go to the next route handler callback method.
//     // res.send("apple"); // now, if we comment it will be same as hanged here as no response and does not go to the next route handle itself.
//     next(); // for we need to call the next() given to use by the express as the argument. now when reuest goes after executing it will call the next method.
//     // also when next(); is written then sending the response from the both will get the error as only one response can be send from either of the callback method.
//   },
//   (req, res) => {
//     console.log("this is second route handler.");
//     res.send("apple 2");
//   }
// );

// case 2: when next(); is written then sending the response from the both will get the error as only one response can be send from either of the callback method. if both route handler have send reponse then error as for a single request their meust be one response only. can't send the response again when response is already send by the first method, this will bring error.
// app.use(
//   "/user",
//   (req, res, next) => {
//     // route handler
//     console.log("this is first route handler.");
//     res.send("apple"); // this first one will be send back and request does not go to the next route handler callback method.
//     next(); // for we need to call the next() given to use by the express as the argument. now when reuest goes after executing it will call the next method.
//   },
//   (req, res) => {
//     console.log("this is second route handler.");
//     res.send("apple 2");
//   }
// );

// case 3 : if next() is called before sending the response.
// here the next() will immediately call the next route handler method and then comes back to the res.send() of its own as code is executed line by line by V8 engine and as we have the two responses this will bring error of sending the response to the client whom response is already send.
// also the second route handler will be executed first.
// app.use(
//   "/user",
//   (req, res, next) => {
//     // route handler
//     console.log("this is first route handler.");
//     next(); // for we need to call the next() given to use by the express as the argument. now when reuest goes after executing it will call the next method.
//     res.send("apple"); // this first one will be send back and request does not go to the next route handler callback method.

//   },
//   (req, res) => {
//     console.log("this is second route handler.");
//     res.send("apple 2");
//   }
// );

// case 4 : we can set as many as route handler callback methods we want. and the new ones will be called only when next(); method is called.

// case 5 : when we does not send response and just call the next() method. This will get the can't find /user route error as we express is expecting here a route handler and we have NO another route handler. so this route can't be found.
// app.use(
//   "/user",
//   (req, res, next) => {
//     // route handler
//     console.log("this is first route handler.");
//     next(); // for we need to call the next() given to use by the express as the argument. now when reuest goes after executing it will call the next method.
//   },
//   (req, res, next) => {
//     console.log("this is second route handler.");
//     // no response just the next() method.
//     next();
//   }
// );

// case 6 : we can send the array of methods it works the same. ie. all route handler method in array.
// Also can mix-match that some in the array and some without the array.
app.use("/user", [
  (req, res, next) => {
    // route handler
    console.log("this is first route handler.");
    // res.send("this is first route handler!");
    next(); // for we need to call the next() given to use by the express as the argument. now when reuest goes after executing it will call the next method.
  },
  (req, res, next) => {
    console.log("this is second route handler.");
    // res.send("this is second route handler!");
    next();
  },
], (req, res, next)=>{
   console.log("this is third route handler.");
    res.send("this is third route handler!");
});

const port = 8000;

app.listen(port, () => {
  console.log(`server is successfully listening at port ${port}`);
});
