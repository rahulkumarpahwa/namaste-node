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

app.use(express.json());

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

app.get("/feed", async (req, res) => {
  try {
    const data = await User.find({});
    console.log(data);
    // res.send("data founded successfully! " + "data is : \n" +  data + data.length);
    res.json({ success: true, data: data, length: data.length });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// steps to update and delete the user in the database:

// delete api
// steps :
// 1. use the method findByIdAndDelete and DELETE http method
// 2. the userId will be send in the request body.
// 3. use the try-catch block
// 4. the method returns the deleted user which can be logged or send as response.

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("User deleted successfully!");
    res.send("deleted user" + deletedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// update user:
// steps:
// 1. we will use the method PATCH of the http.
// 2. we will use the findByIdAndUpdate
// 3. it will return the update document and use try-catch
//4. we will update the name passed by the user.
// 5. { new: true } is passed as options to return the updated one user. we can use the option as :
// {returnDocument : "after"} as well to get the docuement before or after one based upon the value passed!
// 6. first argument passed is id, then updation in the same format as document in schema while creating the new one and then third argument options. you can pass the only updated part only as well rest will remain same or change the whole as well.

app.patch("/user", async (req, res) => {
  // const userId = req.body.userId;
  // const firstName = req.body.firstName;
  const {userId, firstName} = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {firstName : firstName}, { new: true });
    console.log("User Updated successfully!");
    // res.json({changed : [{ updatedUser }]});
    res.json({ updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// note :
// 1. we can use the findOneAndUpdate which is equivalent to findByIdAndUpdate (this on is used more often)