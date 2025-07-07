const { token } = require("morgan");
const User = require("../Models/userModel");
const { validateData, validateEditData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ConnectionRequest = require("../Models/connectionRequestModel");

exports.getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    console.log(err.message);

    res.status(400).send(err.message);
  }
};

exports.getRequestReceived = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const isconnection = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age skill");

    const data = isconnection.map((el) => {
      return el.fromUserId;
    });

    if (!isconnection) {
      throw new Error(
        "Ooops seems like no connection requests available for you"
      );
    }

    res.status(200).json({
      message: "Here are your Connection requests received",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
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
