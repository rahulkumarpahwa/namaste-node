const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { User } = require("../models/userSchema.js");

const profileRouter = express.Router();

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    res.send(req.user); // sending back the user details after verifying with the userAuth.
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  // API validations
  const userId = req.query.userId; // we will take the userId from the query params.
  // console.log(req.query);
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["about", "photoUrl", "skills"];
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

    // console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      userId, // Id to identify the user.
      data, // data to be updated
      { new: true, runValidators: true } // options objects
    );

    // console.log("User Updated successfully!");
    // res.json({changed : [{ updatedUser }]});
    res.json({ updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/password", userAuth, async (req, res) => {});

module.exports = profileRouter;
