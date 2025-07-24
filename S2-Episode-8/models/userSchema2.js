const mongoose = require("mongoose");
const validator = require("validator");
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
    }, 
    validate(value) {
      // validating the photoUrl
      if (!validator.isURL(value)) {
        throw new Error("Invalid Photo Url" + value);
      }
    },
  },
  { timestamps: true } // adding the timestamps
);

const User = mongoose.model("User", userSchema);
module.exports = { User };

// steps:
// 1. create a folder models.js
// 2. define a file userModel.js and similar names files can be created based upon the name of the model
//3. first create the schema using the new mongoose.Schema and pass the object of the schema in the function as argument.
// the name of field can be putted in any case, but mostly used the camelCase.
//4. create a variable name (Model name) and pass it in the mongoose.model as argument along with the schema and Store in ModelName variable.
//5. export the ModelName.

// validations :
// 1. we will first go to the Schema Types on the mongoose website, to see the types of schemas we can define. Refer to : https://mongoosejs.com/docs/schematypes.html#all-schema-types
//2. so we have the properties which are always required, so we can set that options as required : true and fields such as : firstName, email and password.
//3. similarly some fields need to be unique and can't be repeated or same for two users such as email, so for that we can set unique : true
// 4. similarly for the some fields we can define type such as skills which can have array of String.
// when the String array is added in the database it will create a empty space in the database until values are added as 'Array(empty)'.
// 5. some fields may have a default values as well, which can be defined with the default property for eg. such as about, photoUrl
//6. Also we can put the data in the DB in the lower case, so for that we will set the lowercase boolean to true, like in case of email. this will make sure the a single type of case is stored in the database.
//7. also the whitespaces can be trimmed using the trim property set to true, as it is important that the mongoDB treats the one with white-spaces as different value.
//8. similar for minLength and maxLength for String and min and max for the Number type.
//9. similary more can be seen under the topic SchemaType options.

// writing a custom validator: (this will work only when we create a new User object.)
// suppose we want the custom validation, for the gender which we will check that the values other than "male", "female" and "others" will throw the error as response. so for that we will define the function 'validate(value)' which will take the value pass to the properties as argument and then we will put the check conditions over it in the method. (see above the gender property.)

// adding the timestamps: to the tell the time at which user has been added to the database, at timestamp is needed which can be easily created by using the {timestamps : true} as the second argument in the new Schema({<user schema>}, {timestamps : true}) while creating a new schema. (see above) we have to set it to the true and it will add the createdAt and updatedAt in the timestamps.
// we can use these to check who has joined the platform in the last seven days or whom has updated their profile in the last seven days.

// the email validations : suppose some user passed the email as simple string without the @ and gmail.com or anyother mail server. then it will create problem at our end. so validating email is such a big problem as we have check everything @, a mailserver and .com or some other is present in the email string. so to do that we will use external library. 'npm validator'

// It is simple to use as :
// const validator = require("validator");
// validator.isEmail(data.email); // returns true or false.

// here we applied the validator at the email as :
// validate(value) {
//         // validating email using the validator package.
//         if (!validator.isEmail(value)) {
//           throw new Error("Invalid email Address " + value);
//         }
//       },
// ie. using the validate function in which we call the validator.isEmail() to check for the email.

// similar validation can be applied over the photoUrl. using validator.isURL() as :
//  validate(value) {
//       if (!validator.isURL(value)) {
//         throw new Error("Invalid Photo Url" + value);
//       }
//     },


// similar validation can be applied on the password using the validator.isStrongPassword(value);


/* NEVER TRUST REQ.BODY */