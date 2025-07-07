const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "transgender", "rather not to say"],
    default: "rather not to say",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };

// steps:
// 1. create a folder models.js
// 2. define a file userModel.js and similar names files can be created based upon the name of the model
//3. first create the schema using the new mongoose.Schema and pass the object of the schema in the function as argument.
// the name of field can be putted in any case, but mostly used the camelCase.
//4. create a variable name (Model name) and pass it in the mongoose.model as argument along with the schema and Store in ModelName variable.
//5. export the ModelName.
