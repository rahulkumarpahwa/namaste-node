const express = require("express");
const app = express();
const { connectDB } = require("./config/database.js");
const { User } = require("./models/userSchema.js");
const port = 8000;
connectDB()
  .then(() => {
    console.log("database connected successfully!");
    app.listen(port, () => {
      console.log(`server is successfully listening at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.send("data added successfully!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const data = await User.find({});
    console.log(data);
    // res.send("data founded successfully! " + "data is : \n" +  data + data.length);
    res.json({ success: true, data: data, length: data.length });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("User deleted successfully!");
    res.send("deleted user" + deletedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.patch("/user", async (req, res) => {
  // here we are patching the firstname (updating the firstname)
  // const userId = req.body.userId;
  // const firstName = req.body.firstName;
  const { userId, firstName } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId, // Id to identify the user.
      { firstName: firstName }, // data to be updated
      { new: true, runValidators: true } // options objects :  1. new will returned the new user. 2.this will check the custom validations for the updated user acording to the schema.
    );
    // the custom validations we have added in our schema will work only for the new User object created and not for the existing object and to make that work we will have use the [options] under the Model.findByIdAndUpdate() method.
    // for that we will pass a custom options in method as '{runValidators : true}' after the userId, data to be updated and then the options.

    console.log("User Updated successfully!");
    // res.json({changed : [{ updatedUser }]});
    res.json({ updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 1. validations : until now we are adding the garbage in the database but here we will make strict checks on the data entered by user so that only valid data is to be added in the database.
// 2. there are multiple ways to do that.
// 3. we are not worried about the get api but we are majorly worried about the post api ans patch api which are inserting data in the database. so we need to put checks here.
// 4. but before that we will put the checks on the schema itself.

app.patch("/user/:userId", async (req, res) => {
  // API validations
  const userId = req.params?.userId; // we will take the userId from the params.
  const data = req.body;
  try {
    // const ALLOWED_UPDATES = ["userId", "about", "photoUrl", "skills"]; // userId is must as it is needed to get the data updated. but userId is not allowed to be updated.

    const ALLOWED_UPDATES = ["about", "photoUrl", "skills"];
    // userId id needed but to secure it from being updated we will take tahat as params.
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

    const updatedUser = await User.findByIdAndUpdate(
      userId, // Id to identify the user.
      data, // data to be updated
      { new: true, runValidators: true } // options objects
    );

    console.log("User Updated successfully!");
    // res.json({changed : [{ updatedUser }]});
    res.json({ updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// now we will do the API validation ie. check the data coming in the API before making it store in the DB. this ensures that only valid data is inputted in the database and safe it from the attacks by injection in the database.
// eg : the api tries to update the emailId. but we want that our user will put the email once only as in the most platforms so in such cases we will put the API validations to safe from the such changes to try to change the email. as the Email is sensitive. It act as indentity.
// eg 2: if we pass the scrap along with post request in the postman, then our API is not sanitizing such request and data is still updated. so in such cases, we will use API validations.

// so we will do the changes in PATCH route and ignore any changes in the email.

// steps :
// 1. create a array of 'allowed updates' of the keys of the data object.
//2. for each key (k) of the data (request.body) coming of out the request check with array above using the includes method and it should be in the Allowed_Updates field/array.
// 3. Also make sure to add the userId in it as it is needed to update the document. but userId is not allowed to be updated. so for that we will take userId as params in the req.url as
// const userId = req.params?.userId; make sure to put the ? so as to have no error if no value of the userId is passed.
//4. if any of the field is additional throw error.
// 5. update the field and return the response that user has been updated.
// 6. use the try-catch as before.

// we always need to sanitise the data coming from the api. never trust data coming from the user.

// eg 2: the skills arrays must have the length not more than 10. this might be helpful when a hacker sends about the 1Millions skills in the array and DB may break.
// so we can put the check for that as :
//skills length validation
// if (data?.skills.length > 10) {
//   throw new Error("Skills can't be more than 10.");
 // }
