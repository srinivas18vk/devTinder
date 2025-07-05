const { token } = require("morgan");
const User = require("../Models/userModel");
const { validateData, validateEditData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    console.log(err.message);

    res.status(400).send(err.message);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    res.json({
      message: err.message,
      stack: err.stack,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    console.log(req.user);

    validateEditData(req);
    if (!validateEditData) {
      throw new Error("Invalid input errors");
    }
    // console.log("req", req.user);
    // const id = req.user._id;
    // const data = req.body;
    // // console.log(req.user);
    Object.keys(req.body).forEach((key) => (req.user[key] = req.body[key]));

    // const updatedUser = await User.findByIdAndUpdate(id, data, {
    //   new: true,
    //   runValidators: true,
    //   returnDocument: "after",
    // }).select({ password: false });

    // if (!updatedUser) {
    //   return res.status(404).send({ message: "User not found" });
    // }

    req.user.save();
    res.status(200).json({
      status: "success",
      //data: updatedUser,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "successfully Deleted",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
