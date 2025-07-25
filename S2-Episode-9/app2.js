const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { connectDB } = require("./config/database.js");
const { User } = require("./models/userSchema.js");
const { validateSignUpData } = require("./utils/validation.js");
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
  try {
    validateSignUpData(req); // validating the data before saving.
    const { firstName, lastName, email, password } = req.body;
    // encrypting the data
    const passwordHash = await bcrypt.hash(password, 10); // password and 10 salt rounds.
    // returns a promise so use a await to handle that.
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await newUser.save();
    res.send("data added successfully!");
  } catch (error) {
    res.status(400).send("error : " + error.message);
  }
});

// ep 2.9
// Safely storing the passwords in the database and authenticate as well.
// 1. first thing is store the password not in the string simple but in the hashed format.
// 2. so password should be hashed ie. encrypted.
// 3. so we will update our signup API. As we can't trust the data send by the user in API so we will make it more secure and encrypted.
// steps :
// 1. validate the data.
// 2. encrypt the password.
// 3. store the user data.
// 4. to validate the data send by the user we will create some helper functions or middlewares which can be used to do that.
// 5. Steps for creating a helper function for validating the data.
// A. create utils/helpers folder in the src folder.
// B. create a validation.js file.
// C. create a function validateSignUpData as we are validating the signup data given by the user.
// D. take the agruments req (request) in the method.
// E. we will extract the req.body and take out the firstName, lastName, emailId and password.
// F. then we will check :
// i. check if the firstName and lastName does not exist then throw error.
// ii. check the email using the validator.isEmail(value) from the validator package otherwise throw error.
// iii. check the password using the validator.isStrongPassword(value) from the validator package else throw error.
// export the function using module.exports and then import in the app.js
// 6. put the method inside the signup route and then pass the req in the function validateSignUpData(req). make sure to have the try-catch block to catch the error occur.

// encrypting the password:
// 1. we will use the package bcrypt for that hashing and then validating the password entered by the user.
//2. steps :
// A. const bcrypt = require("bcrypt");
// const {password } = req.body;
// B. const passwordHash = await bcrypt.hash(<password>, <no. of salt rounds>); // it returns a promise.
// the more the salting rounds, more it is tough to break the password.
// basic no. of salting rounds is 10. more rounds also means more time to hash the password.
// C. so we will store the passwordHashed in the database/ while creating a new User.
// we will store only the firstName, lastName, email and passwordHashed in DB.
// the new user stored password will be encrypted.

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

app.patch("/user/:userId", async (req, res) => {
  // API validations
  const userId = req.params?.userId; // we will take the userId from the params.
  const data = req.body;
  try {
    // const ALLOWED_UPDATES = ["userId", "about", "photoUrl", "skills"]; // userId is must as it is needed to get the data updated. but userId is not allowed to be updated.

    const ALLOWED_UPDATES = ["about", "photoUrl", "skills"];
    // userId id needed but to secure it from being updated we will take tahat as params.
    const isUpdateAllowed = Object.keys(data).every(
      (k) => ALLOWED_UPDATES.includes(k) // k represent the each key.
    );

    // one check
    if (!isUpdateAllowed) {
      throw new Error("Update not Alllowed");
    }

    // skills length validation
    if (data?.skills.length > 10) {
      throw new Error("Skills can't be more than 10.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, // Id to identify the user.
      data, // data to be updated
      { new: true, runValidators: true } // options objects
    );

    console.log("User Updated successfully!");
    // res.json({changed : [{ updatedUser }]});
    res.json({ updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
