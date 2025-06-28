const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxLength: [20, "first name should not have more than 20 characters"],
    required: [true, "A user should always have a name"],
  },
  lastName: {
    type: String,
    maxLength: [20, "last name should not have more than 20 characters"],
    required: [true, "A user should always have a name"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "user must have gender"],
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "password must be at least 8 characters long"],
    maxLength: [20, "password must not be more than 20 characters long"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
