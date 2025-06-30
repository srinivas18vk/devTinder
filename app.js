const express = require("express");
const app = express();
const morgan = require("morgan");
const User = require("./Models/userModel");
const userRouter = require("./Router/userRoutes");

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/users", userRouter);

// app.all("*", (req, res) => {
//   res.status(404).json({
//     status: false,
//     message: `Cant find ${req.originalUrl} on this route`,
//   });
// });

module.exports = app;
