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

// our first api to add the data : ie. the post api. the route name should be exact the name used to insert the data.
// now here we will try to receive the data from the user request in raw json format and then push that data into the database.

// steps:
// 1. create a JSON in the postman under the raw data format for BODY. 
// req : send the data in readable stream in JSON format which can't be readable by the express directly, we need to parse it first.
// 2. now create a middleware to parse JSON to js object as app.use(express.json()); where express.json(); is inbuilt express parser, otherwise req.body will be undefined.
// 3. create a User instance and pass the req.body in it.
// 4. use try-catch to call the save method and then send response of data being added.  


// Middleware to parse JSON data otherwise req.body will be undefined. It will be activated for all the routes. 
app.use(express.json()); // this will handle the request and parse the data itself.

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.send("data added successfully!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});
