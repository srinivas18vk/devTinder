const validator = require("validator");

const validateData = (req) => {
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    gender,
    skill,
  } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please provide a Strong and valid password");
  } else if (password !== passwordConfirm) {
    throw new Error("Password and PasswordConfirm should be always be same");
  }
};

const validateEditData = (req) => {
  console.log("ksjgas j gasfj", req.body);

  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "photoURL",
    "age",
    "about",
    "skill",
  ];
  console.log("111ksjgas j gasfj");
  const isEditAllowed = Object.keys(req.body).every((val) =>
    allowedEditFields.includes(val)
  );
  console.log("isEditAllowed", isEditAllowed);
  return isEditAllowed;
};

module.exports = {
  validateData,
  validateEditData,
};
