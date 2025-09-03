const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    // when name is empty string.
    throw new Error("First Name or Last Name must exist!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email must be valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be Strong!");
  }
};

const validateProfileEditData = (data) => {
  const ALLOWED_EDIT_FIELDS = ["about", "photoUrl", "skills", "age"];
  const isEditAllowed = Object.keys(data).every(
    (key) => ALLOWED_EDIT_FIELDS.includes(key) // key represent the each key.
  );
  return isEditAllowed;
};


module.exports = { validateSignUpData, validateProfileEditData };
