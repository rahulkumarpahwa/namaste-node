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

app.patch("/user", async (req, res) => {
  // here we are patching the firstname (updating the firstname)
  // const userId = req.body.userId;
  // const firstName = req.body.firstName;
  const { userId, firstName } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId, // Id to identify the user.
      { firstName: firstName }, // data to be updated
      { new: true, runValidators: true } // options objects :  1. new will returned the new user. 2.this will check the custom validations for the updated user acording to the schema.
    );
    // the custom validations we have added in our schema will work only for the new User object created and not for the existing object and to make that work we will have use the [options] under the Model.findByIdAndUpdate() method.
    // for that we will pass a custom options in method as '{runValidators : true}' after the userId, data to be updated and then the options.

    console.log("User Updated successfully!");
    // res.json({changed : [{ updatedUser }]});
    res.json({ updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 1. validations : until now we are adding the garbage in the database but here we will make strict checks on the data entered by user so that only valid data is to be added in the database.
// 2. there are multiple ways to do that.
// 3. we are not worried about the get api but we are majorly worried about the post api ans patch api which are inserting data in the database. so we need to put checks here.
// 4. but before that we will put the checks on the schema itself.
