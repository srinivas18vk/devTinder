// const { token } = require("morgan");
const User = require("../Models/userModel");
const { validateData } = require("../utils/validation");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    //console.log("req.body :", req.body);
    validateData(req);
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      gender,
      skill,
    } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 12);
    // const hashedPasswordConfirm = await bcrypt.hash(passwordConfirm, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      gender,
      skill,
      password,
      passwordConfirm,
    });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("No user found ");
    }

    const hashingPass = await bcrypt.compare(password, user.password);

    if (!hashingPass) {
      throw new Error(
        "Opps the entered password is incorrect, please login with valid credentials"
      );
    }

    const token = await user.getJWT();
    // const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.cookie("token", token);
    res.send(user.firstName + " logged-in Successfully");
  } catch (err) {
    res.status(400).send({
      message: err.message,
      stack: err.stack,
    });
  }
};
