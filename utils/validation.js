const validator = require("validator");


const validateData = (req) => {
  const { firstName, lastName, email, password, passwordConfirm, gender } =
    req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please provide a Strong and valid password");
  } else if (password !== passwordConfirm) {
    throw new Error("Password and PasswordConfirm should be always be same");
  }
};

module.exports = {
  validateData,
};
