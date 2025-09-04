const express = require("express");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth.js");
const validator = require("validator");
const { User } = require("../models/userSchema.js");
const { validateProfileEditData } = require("../utils/validation.js");

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
  try {
    // data sanitation
    if (!validateProfileEditData(req.body)) {
      throw new Error("Invalid! Edit Not Allowed!");
    }

    // other validations:
    const { photoUrl, skills } = req.body;

    if (skills != null && skills.length > 10) {
      throw new Error("Skills should be less than 10! Update Not Allowed!");
    }

    if (photoUrl != "" && !validator.isURL(photoUrl)) {
      throw new Error("photo url must be a link!");
    }

    const loggedInUser = req.user; // attached by the auth user.
    // console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      loggedInUser._id, // Id to identify the user.
      req.body, // data to be updated
      { new: true, runValidators: true } // options objects
    );
    res.json({
      success: true,
      status: 200,
      message: `${loggedInUser.firstName}, your profile has been updated!`,
      edits: req.body,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/password", userAuth, async (req, res) => {
  try {
    const ALLOWED_EDIT_FIELDS = ["newPassword", "reNewPassword"];
    const isEditAllowed = Object.keys(req.body).every(
      (key) => ALLOWED_EDIT_FIELDS.includes(key) // key represent the each key.
    );
    if (!isEditAllowed) {
      throw new Error("Update not Allowed!");
    }
    const { newPassword, reNewPassword } = req.body;
    if (newPassword !== reNewPassword) {
      throw new Error("Password must be same!");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Password must be Strong!");
    }

    // hashing and salting :
    const passwordHash = await bcrypt.hash(newPassword, 10); // password and 10 salt rounds.
    const updatedUser = await User.findByIdAndUpdate( req.user._id, {
      password: passwordHash,
    });

    res.send({ data: updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = profileRouter;
