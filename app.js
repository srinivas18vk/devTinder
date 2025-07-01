const express = require("express");
const app = express();
const morgan = require("morgan");
const User = require("./Models/userModel");
const userRouter = require("./Router/userRoutes");
const cookieparser = require("cookie-parser");

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieparser());

app.use("/api/v1/users", userRouter);

// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: false,
//     message: `Cant find ${req.originalUrl} on this route`,
//   });
// });

// // Error handling middleware (generic 404)
// app.use((req, res, next) => {
//   res.status(404).json({
//     status: false,
//     message: `Can't find ${req.originalUrl} on this route`,
//   });
// });

module.exports = app;
