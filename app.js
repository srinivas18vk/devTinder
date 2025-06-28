const express = require("express");
const app = express();
const morgan = require("morgan");
const User = require("./Models/userModel");


app.use(morgan("dev"));

app.use(express.json());

app.post("/createUser", async (req, res) => {
  try {
    console.log("req.body :", req.body);
    const user = await User.create(req.body);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
