const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { connectDB } = require("./config/database.js");
const { User } = require("./models/userSchema.js");
const { validateSignUpData } = require("./utils/validation.js");
const secret = "jhfsdfhshfsfhhfjahfkasfhk"; // any random secret for the jwt. can put as env as well.
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
app.use(cookieParser()); // parsing the cookies.

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req); // validating the data before saving.
    const { firstName, lastName, email, password } = req.body;
    // encrypting the data
    const passwordHash = await bcrypt.hash(password, 10); // password and 10 salt rounds.
    // returns a promise so use a await to handle that.
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await newUser.save();
    res.send("data added successfully!");
  } catch (error) {
    res.status(400).send("error : " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validating the email:
    if (!validator.isEmail(email)) {
      throw new Error("Enter a valid credentials!");
    }
    // checking if userExist or not.
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      throw new Error("Invalid Credentials!");
    }
    // checking password.
    const isValidPassword = await bcrypt.compare(password, findUser.password);
    if (isValidPassword) {
      // we will do the cookie work here.
      // 1. creating the JWT token.
      // 2. add the token to cookie and send the response back to the user with the cookie as well.
      // It is like the temporary password which will come in all the request that came to the server.

      // sending the cookie :
      // the express provides us the way to send back the cookie very easily back to the cleint along with the response.
      // this is done as :
      // res.cookie("token", "adkjasdjadjakdakdadadaldlad"); // cookie-name and cookie value (string). // basic cookie sending.

      // we will create the token and send it in the form of cookie, which we will verify in the every route we take.
      // to create we will call the method .sign() over jwt and we will hide the data in it, which we will use the userid as _id (taken from the usee loggedIn) and pass a secret key over here as well (which only I /server know.)

      const token = await jwt.sign({ _id: findUser._id }, secret, {
        expiresIn: 60 * 60 * 2,
      }); // expires in two hours

      console.log(token);
      // console.log(typeof token);
      // now we will send the token (string type) back to the user as the cookie.
      res.cookie("token", token);

      res.send("Login Successfully!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }

  // summary : we will check the userId and password. then generate the jwt token using the sign() method and pass the userId (hiding)in it. then we will create the cookie with the token and then send the response back to the client.
});

// to get back the cookie we will create the another route say GET /profile route as :
app.get("/profile", async (req, res) => {
  try {
    // to get the cookies we will use the req.cookies as :
    const cookies = req.cookies; // cookies will give all the cookies.
    // console.log(cookies); // we will get the undefined.
    // this is because we need to parse the data coming out of the req.cookies as recommended by the express. so we have another package cookie-parser. so we will install it and it act as a middleware.
    // so we will add the cookie-parser in the app.use(cookieParser()); (see below the json parser).
    // now we can read the cookie.

    // we will now take out the token out of the req.cookies and verify it. otherwise when failed to loggedIn we will ask the user to login again as token has been expired.

    const { token } = req.cookies; // cookies is giving all the cookies. ie. why we are destructuring the cookies object to take out the token.
    // we will extract the token and then we will validate the token.

    // we will also check for the error like : token not exist. then :
    if (!token) {
      throw new Error("Invalid Token!");
    }

    // now we will create a JWT token using the JWT.io
    // the token consists of three parts: 1. header (red) 2. payload (pink) 3. signature (blue) to verify.

    // install jsonwebtoken from npm and then it has same methods to sign and verify the token like the bcrypt's hash and compare.

    // when we creating a token, then we can hide some data inside it. (this part is done under the /login route)

    // here we will get the cookie which has the jwt token and before sending the profile data of the user we will verify the token using the jwt.verify() method.

    const decodedToken = await jwt.verify(token, secret);
    const { _id } = decodedToken;
    // console.log(decodedToken);
    // we will get like
    // { _id: '68b53b34a27690de0f00f760', iat: 1756713109, exp: 1756720309 }
    // now we will find the user from the _id we got and then send the details of the user loggedIn.

    const findUser = await User.findOne({ _id: _id });
    // we will check for the user errors as well, when we get the token, user does not exist.
    if (!findUser) {
      throw new Error("User does not Exists!");
    }
    // we can also return the user to login again!

    res.send(findUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// summary :
// whenever we hit the login api, the server will send the client a cookie (having a Token) and browser will read the cookie and store it safely.
// when we send the request to another api from the client to the server, it's browser duty to send the cookie back to the server for verification.
// But if the client delete the cookie we will not get the token from the cookie.
// we will get the data from the cookie (_id ) and then send the detials based on the id from the cookie back to the user.
// the cookie has the data to which user it belongs and based upon that the details of the user are send back.

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

// ep 2.10
// we will talk about the cookies, JWT and Auth middleware ie. advance authentication.
// when we go to the /login route, what will happen?
// when we login only then we can access the different routes. to update the profile, to delete the profile, to sendrequest to other users, to get all the connections.
// so basically we need to get loggedIn, ie. authorized only then we can access the routes.

// example / scenario:
// earlier we know that when we request to an API, then the protocol used is TCP/IP protocol. the data will be send back by the server and the connection is closed after that.
// similar examples can be that when user wants to update the profile then it can send the patch request to the server and then server will first check that user is authenticated or not then it will take the request and then the profile is updated after that. and after the response is end back to the user the TCP/IP connection is closed.
// in nutshell, the request is send then to the TCP/IP connection is made and response is send back and then connection is closed.

// Now, when happens when the user login?
// when a server is loggedin using the email and password then server authenticates it and then sends back a JWT token. This JWT is recieved by the client and stored in the clientside( JWT AS the cookie in the browser).
// now when the user request to update the /profile, to get the connections at /connections or the /update the profile then JWT token is passed along with it, each time this happens.
// The JWT token is verifyed again by the server and validate it so that the request can be complted and respone is shared back.

// storage of the cookie :
// to stored the JWT token back in the client, we will have the cookies with which we store the token and each token is uniques for the user, once it is created.
// when the cookie is came to the browser, it will be stored in the browser.
// we can set the expiration of the cookie and token as well.

// what happens when the cookies/token gets expired?
// then when a cookie which is expired is send to have a request done then it fails the verification by the server and then user is redirected to the login page.

// summary : LOGIN -> JWT TOKEN GENERATED -> SEND AS COOKIE -> ANY NEW REQUEST -> JWT TOKEN SENDED ALONG AND VERIFIED -> IF EXPIRED -> RE-LOGIN + GENERATED NEW COOKIE.
