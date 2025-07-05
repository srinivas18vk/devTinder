const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: [20, "first name should not have more than 20 characters"],
      required: [true, "A user should always have a name"],
    },
    lastName: {
      type: String,
      maxength: [20, "last name should not have more than 20 characters"],
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
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not suppported",
      },
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
      min: [1, "yoyoy"],
      max: [10, "maximum 10 skills can be updated, you hace provided "],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "password must be at least 8 characters long"],
      maxlength: [20, "password must not be more than 20 characters long"],
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

userSchema.pre("save", function (next) {
  if (this.skill.length < 1 || this.skill.length > 10) {
    next(new Error("Skills  must have between 1 and 10 elements."));
  } else {
    next();
  }
});

userSchema.methods.getJWT = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return token;
  } catch (err) {
    console.log(err.message);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
