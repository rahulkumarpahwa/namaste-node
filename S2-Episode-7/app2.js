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

// to get the data of the user
//steps :
// 1. we will create the /feed api, which will get show us all the cards shown on the screen.
// 2. make a GET request and we will use the User model to get the all the users data.
// 3. to find the users we will use the find() method of mongoose of the Models (check documentation) and we have to make the method async and await as it returns the promise.
// 4. log the data and then send the response that data has been founded.
// also use the try-catch to handle the error.
//5. it returns the array of documents (objects)

app.get("/feed", async (req, res) => {
  try {
    const data = await User.find({});
    console.log(data);
    // res.send("data founded successfully! " + "data is : \n" +  data + data.length);
    res.json({success : true,  data: data, length: data.length  });
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// note : 
// 1. while using the findOne() method if the condition to be check to find has two documents same then first one will be returned.
// 2. if we don't pass anything in the findOne() method the mongoose will return any random arbitary document.
// 3. also no two users should have an email id in the first place.