const User = require("../Models/userModel");
const { validateData } = require("../utils/validation");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    //console.log("req.body :", req.body);
    validateData(req);
    const { firstName, lastName, email, password, passwordConfirm, gender } =
      req.body;
    // const hashedPassword = await bcrypt.hash(password, 12);
    // const hashedPasswordConfirm = await bcrypt.hash(passwordConfirm, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      gender,
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
    console.log(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("body: ", req.body);

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("No user found ");
    }
    console.log("User : ", user);
    const hashingPass = await bcrypt.compare(password, user.password);
    console.log("hashingPass", hashingPass);

    if (!hashingPass) {
      throw new Error(
        "Opps the entered password is incorrect, please login with valid credentials"
      );
    }
    res.send("loggedin");
  } catch (err) {
    res.status(400).send({
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
    console.log(err.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const data = req.body;
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "gender",
      "age",
      "about",
      "skill",
      "photoURL,",
    ];
    const isUpdateAllowed = Object.keys(data).every((val) =>
      ALLOWED_UPDATES.includes(val)
    );
    if (!isUpdateAllowed) {
      throw new Error("not allowed to update this field");
    }
    if (data?.skill.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
      returnDocument: "after",
    });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err.message);
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
    console.log(err.message);
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
