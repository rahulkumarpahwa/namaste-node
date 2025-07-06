const getToken = () => {
  return "aaa";
}; // we have define in the app.js for the previous cases to work.

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

const userAuth = (req, res, next) => {
  const token = getToken();
  const authorizedUser = () => {
    return token === "aaa";
  };
  if (authorizedUser()) {
    next(); // will call the routes with /user
  } else {
    res.status(401).send("UnAuthorized user!");
  }
};

module.exports = { adminAuth, userAuth };
