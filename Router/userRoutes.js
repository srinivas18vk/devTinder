const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const { authorize } = require("../Middleware/auth");

// router.post("/signUp", userController.signUp);
// router.post("/login", userController.login);

router.route("/user").get(userController.getAllUser);
router
  .route("/user/requests/received")
  .get(authorize, userController.getRequestReceived);

router.get("/getProfile", authorize, userController.getProfile);
router.patch("/editProfile", authorize, userController.editUser);
router
  .route("/:id")
  .get(userController.getOneUser)
  //  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
