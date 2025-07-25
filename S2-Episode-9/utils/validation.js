const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) { // when name is empty string.
    throw new Error("First Name or Last Name must exist!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email must be valid!");
  } else if (!validateSignUpData.isStrongPassword(password)) {
    throw new Error("Password must be Strong!");
  }
};

module.exports = { validateSignUpData };
