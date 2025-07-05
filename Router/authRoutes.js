const express = require("express");
const authRouter = express.Router();
const authController = require("../Controller/authController");

authRouter.post("/signUp", authController.signUp);
authRouter.post("/login", authController.login);
// router.post('/logout',userController.logout)

module.exports = authRouter;
