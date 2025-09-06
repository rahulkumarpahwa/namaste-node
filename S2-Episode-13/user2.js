const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { User } = require("../models/userSchema.js");
const ConnectionRequestModel = require("../models/connectionRequest.js");
const userRouter = express.Router();

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const data = await User.find({}).select(
      "-password -email -createdAt -updatedAt"
    ); // removing the password and email from the feed.
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
    }).populate(
      "fromUserId toUserId",
      "firstName lastName photoUrl age gender about"
    ); // populate is only possible after we have make the 'ref' reference in the connectionRequestSchema.;

    const data = allConnections.map((row) => {
      if (row.fromUserId._id.equals(userId)) {  // 
        // NOTE : use the equals() method here as the userId and fromUserId._id both are objectId and not strings.
        // OR convert both to the the strings using toString() method and then compare using ===
        // when the curr user is sender then we will show the reciever (toUserId)
        return row.toUserId;
      } else { 
        // otherwise we will show the user who has send the request.
        return row.fromUserId;
      }
    });

    res.json({
      success: true,
      status: 200,
      message:
        "All the connections which are either accepted by me or they accepted me.",
      data: data,
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
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "gender",
        "about",
        "skills",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "gender",
        "about",
        "skills",
      ]); // populate is only possible after we have make the 'ref' reference in the connectionRequestSchema.
    res.json({ success: true, status: 200, data: AllInterestedRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = userRouter;
