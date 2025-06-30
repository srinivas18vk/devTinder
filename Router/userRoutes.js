const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

router.post("/signUp", userController.signUp);
router.get("/getAllUsers", userController.getAllUser);
router.post("/login", userController.login);
router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
