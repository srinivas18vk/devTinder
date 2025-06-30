const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
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
      validate: [validator.isEmail, "Please provide a valid emailAddress"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "user must have gender"],
    },
    age: {
      type: Number,
    },
    photoURL: {
      type: String,
      default:
        "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg",
      validate: [validator.isURL, "Please provide a valid URL"],
    },
    about: {
      type: String,
      default: `This is about the user `,
    },
    skill: {
      type: [String],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password must be at least 8 characters long"],
      //maxLength: [20, "password must not be more than 20 characters long"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "password confirm is required"],
      // validate: {
      //   validator: function (value) {
      //     console.log(this.password, "::", value);

      //     return value === this.password;
      //   },
      //   message: "password confirm must match with password",
      // },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  //here this is the user object and only runs below func if password was actually modified
  if (!this.isModified("password")) return next();
  //hash [asswrd with cost of 12]
  this.password = await bcrypt.hash(this.password, 12);
  //delete passconfirm
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
