const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { User } = require("../models/userSchema.js");
const ConnectionRequestModel = require("../models/connectionRequest.js");
const userRouter = express.Router();

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const data = await User.find({}).select("-password -email"); // removing the password and email from the feed.
    res.json({ success: true, status: 200, length: data.length, data: data });
  } catch (error) {
    res.status(400).json({ success: false, status: 400, error: error.message });
  }
});

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ success: false, status: 400, error: error.message });
  }
});

userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const toUserId = req.user._id;

    const AllInterestedRequest = await ConnectionRequestModel.find({
      toUserId: toUserId,
    });
    res.json({ success: true, status: 200, data: AllInterestedRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = userRouter;
