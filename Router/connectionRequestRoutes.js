const express = require("express");
const router = express.Router();
const { authorize } = require("../Middleware/auth");
const connectionRequestController = require("../Controller/connectionRequestController");

router.post(
  "/send/:status/:toUserId",
  authorize,
  connectionRequestController.sendConnectionRrequest
);

module.exports = router;
