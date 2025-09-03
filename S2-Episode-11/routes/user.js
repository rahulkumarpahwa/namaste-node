const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { User } = require("../models/userSchema.js");
const userRouter = express.Router();

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const data = await User.find({});
    res.json({ success: true, data: data, length: data.length });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = userRouter;