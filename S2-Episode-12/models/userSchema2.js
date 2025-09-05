const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "jhfsdfhshfsfhhfjahfkasfhk"; // any random secret for the jwt. can put as env as well.

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4, // characters can't be less than 4.
      maxLength: 50, // max length not more than 50.
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
      min: 18, //min value is 18
    },
    email: {
      type: String,
      required: true,
      unique: true, // makes the email unique and can't add the duplicate email.
      // unique field does not need to create the index as the mongoDB creates the index by itself for such properties.
      lowercase: true, // when stored converted to the lowercase, from any case entered by the user.
      trim: true, //this will remove the extra front and back spaces.
      validate(value) {
        // validating email using the validator package.
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email Address " + value);
        }
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid gender type ",
      },
      validate(value) {
        // refer to the note below.
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], // array of Strings
    },
    about: {
      type: String,
      default: "This is a about section of the user", // default value for the about.
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/026/434/417/non_2x/default-avatar-profile-icon-of-social-media-user-photo-vector.jpg", // default value of the photoUrl.
      validate(value) {
        // validating the photoUrl
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo Url" + value);
        }
      },
    },
    // It is bad idea. why ? because their are so edge cased like the storing the userId will nt make the sense. as the some requests may get aaccepted. some may get hanged in between and some are reqjected and so on. so that's why it is difficult to handled here.
    // Also, the schema defines the something. like userSchema defines the user and similarly we will create a new schema which will define the connection.
    // connections: {
    //   // type: Schema.Types.ObjectId,
    //   // ref:
    // },
  },
  { timestamps: true } // adding the timestamps
);

// don't use the arrow methods.
userSchema.methods.getJWT = async function () {
  const user = this; // as the every instace (newUser) is instace of User model so 'this' refers to that instance.
  const token = await jwt.sign({ _id: user._id }, secret, {
    expiresIn: 60 * 60 * 2,
  });
  return token;
};

// don't use the arrow methods.
userSchema.methods.getPasswordValid = async function (passwordbyuser) {
  const user = this; // as the every instace (newUser) is instace of User model so 'this' refers to that instance.
  const isValidPassword = await bcrypt.compare(passwordbyuser, user.password); // second parameter is hashed password of the user
  return isValidPassword;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
