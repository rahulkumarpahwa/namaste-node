const express = require("express");
const { userAuth } = require("../middlewares/auth.js");

const requestRouter = express.Router();

requestRouter.post("/sendconnectionrequest", userAuth, async (req, res) => {
  res.send("this is the test send connection request by " + req.user.firstName);
});

module.exports = requestRouter;