const mongoose = require("mongoose");
require("dotenv").config();

// refer to the documentation of mongoose.
// we will create another folder config and it contains the file database.js and also we can handle other things their as well.
// we will use the library "mongoose" call to connect to database

// steps : 
// 1. write mongoose.connect(process.env.MONGODB_URI);
// 2. but write it in async-await fxn as it returns the promise and also it tells connection is established successfully or not. so handle according to it.
// 3. handle the promise using then() and catch()
// 4. also when DB is connected it should be connected first then server should be started.
// 5. so we will export the connectDB method from here and after the  database will be coonected then we will start the server.

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

module.exports = { connectDB };

// we will do that in app.js and in its then() we will start the server.
// connectDB()
//   .then(() => {
//     console.log("database connected successfully!");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

 
