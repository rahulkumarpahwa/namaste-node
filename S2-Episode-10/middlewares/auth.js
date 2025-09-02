const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const secret = "jhfsdfhshfsfhhfjahfkasfhk"; // any random secret for the jwt. can put as env as well.

const adminAuth = (req, res, next) => {
  const token = getToken();
  const authorized = () => {
    return token === "aaa";
  };
  if (authorized()) {
    console.log("Authorized!");
    next();
  } else {
    res.status(401).send("Unauthorized admin");
  }
};

// Now, the profile route is secured as it has the token verification and validation from the cookie, but other routes are not secured so for that we will create an middleware userAuth which will authorise the user and allow accessing the routes (except login and signup) only after the verification.

// steps:
// 1. read the token from the req cookies.
// 2. validate the token using the jwt.verify()
// (import the jsonwebtoken surely.)
// we will create a .env file for the secret we use. 
// 3. find the user using the User Model (require it as well.)
// 4. send the user back in the req.

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token!");
    }

    const decodedToken = await jwt.verify(token, secret);
    const { _id } = decodedToken;
    const findUser = await User.findOne({ _id: _id });
    if (!findUser) {
      throw new Error("Invalid User! Does not Exists!");
    }

    req.user = findUser; // attaching the user in the request as we are already finding the user in the database and each request no need to find the user again in the request explicitly.
    next(); // to call the next method /handler
  } catch (error) {
    res.status(400).send(" error " + error.message);
  }
};

module.exports = { adminAuth, userAuth };
