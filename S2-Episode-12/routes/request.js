const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { User } = require("../models/userSchema.js");
const ConnectionRequestModel = require("../models/connectionRequest.js");

const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const { toUserId, status } = req.params;

    // here the status works for both the status:
    // 1. interested
    // 2. ignored
    // so we will take out the status out of the route as the params

    // checking the validations of the status is also need to be done so that
    // only this api works for the interested and ignored.

    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      res.status(400).json({ message: "Invalid Status type : " + status });
      return; // must write the return otherwise you will get the error : `cannot set the headers after they are sent`.
    }

    // sending the connection request to itself : NOT Allowed
    // if (toUserId == req.user._id) { // don't use the ===. as the type in not same, we just need to match the value.
    //   throw new Error("This Request is not allowed!");
    // } 
    // Already defined in the connectionRequestSchema using the schema middleware 'pre'.

    // checking if the user to which I am sending the request exist or not!
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User Does not Exist!",
      });
    }

    // checking if the connection request exists before:
    const connectionRequestExists = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId: req.user._id, toUserId }, // when the user has already send the request to another user.
        {
          fromUserId: toUserId, // when the user to which request is being send has already sended you a request.
          toUserId: req.user._id,
        },
      ],
    });

    if (connectionRequestExists) {
      return res.status(400).json({
        sucess: false,
        status: 400,
        message: "Bad Request! Connection Already Exist!",
      });
    }

    const newConnectionRequest = new ConnectionRequestModel({
      fromUserId: req.user._id,
      toUserId,
      status,
    });

    await newConnectionRequest.save();

    res.json({
      success: true,
      status: 200,
      message: `${status} Connection Request Sent Successfully!`,
      data: newConnectionRequest,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

requestRouter.post(
  "/review/:status/:fromUserId",
  userAuth,
  async (req, res) => {
    try {
      const { fromUserId, status } = req.params;

      // here the status works for both the status:
      // 1. accepted
      // 2. rejected
      // so we will take out the status out of the route as the params

      // checking the validations of the status is also need to be done so that
      // only this api works for the accepted and rejected.

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        res.status(400).json({ message: "Invalid Status type : " + status });
        return; // must write the return otherwise you will get the error : `cannot set the headers after they are sent`.
      }

      const newConnectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId: req.user._id,
        status,
      });

      await newConnectionRequest.save();

      res.json({
        success: true,
        status: 200,
        message: `${status} Connection Reviewed Successfully!`,
        data: newConnectionRequest,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

module.exports = requestRouter;
