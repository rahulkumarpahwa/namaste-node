const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/userSchema.js");
const validator = require("validator");
const { validateSignUpData } = require("../utils/validation.js");
const { userAuth } = require("../middlewares/auth.js");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validating the email:
    if (!validator.isEmail(email)) {
      throw new Error("Enter a valid credentials!");
    }
    // checking if userExist or not.
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      throw new Error("Invalid Credentials!");
    }

    const isValidPassword = await findUser.getPasswordValid(password);
    if (isValidPassword) {
      const token = await findUser.getJWT();
      res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });

      res.send("Login Successfully!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.delete("/delete", userAuth, async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("User deleted successfully!");
    res.send("deleted user" + deletedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = authRouter;
