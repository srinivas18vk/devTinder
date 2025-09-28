const express = require("express");
const app = express();
const morgan = require("morgan");
const User = require("./Models/userModel");
const userRouter = require("./Router/userRoutes");
const authRouter = require("./Router/authRoutes");
const cookieparser = require("cookie-parser");
const connectionRequestRouter = require("./Router/connectionRequestRoutes");

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieparser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
      ///api/v1/users/user/getConnections
app.use("/api/v1/request/", connectionRequestRouter);
       
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
