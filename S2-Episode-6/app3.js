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

// steps:
// here the route is "/signup" as we are adding the user details.
// 1. create a user object which contains the details of the user.
// 2. import the User model which we created in the models folder.
// 3. create a new instance (object) of User model and pass the data to it as the argument and store the instance in the const.
// 4. now call the save() method on the const created. (it should be awaited as it returns a promise). always use try-catch while saving.
//5. send a reponse that data has been send.

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Apple K",
    lastName: "Kumar",
    age: 34,
    email: "applek@gmail.com",
    password: "jdjdjdjjdkj",
    gender: "female",
  };

  const newUser = new User(userObj); // create a new instance of the User object.
  try {
    await newUser.save(); // saving the data.
    console.log("data added!");
    res.send("data added!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// case 2 : other way :
// Middleware to parse JSON data
// app.use(express.json());

// Middleware to parse URL-encoded data
// app.use(express.urlencoded({ extended: true }));

// app.post("/user/insert", async (req, res) => {
//   console.log(req.body);
//   await User.insertOne(req.body);
//   res.send("data added successfully!");
// });
