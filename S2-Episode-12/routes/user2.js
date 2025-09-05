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
    const userId = req.user._id;
    //finding all the users who has status accepted to me and me is as 'toUserId' or the 'fromUserId'.
    const allConnections = await ConnectionRequestModel.find({
      $or: [{ toUserId: userId }, { fromUserId: userId }],
      status: "accepted",
    });

    res.json({
      success: true,
      status: 200,
      message:
        "All the connections which are either accepted by me or they accepted me.",
      data: allConnections,
    });
  } catch (error) {
    res.status(400).json({ success: false, status: 400, error: error.message });
  }
});

userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const toUserId = req.user._id;

    const AllInterestedRequest = await ConnectionRequestModel.find({
      $or: [
        { toUserId: toUserId, status: "interested" }, // all the requests which are interested in you
        {
          fromUserId: req.user._id,
          status: "rejected", // when the user you send request has rejected, then to acknowledge that we will also see the rejected request at this route.
        },
      ],
    });
    res.json({ success: true, status: 200, data: AllInterestedRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = userRouter;
