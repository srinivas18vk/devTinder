const express = require("express");
const router = express.Router();
const { authorize } = require("../Middleware/auth");
const connectionRequestController = require("../Controller/connectionRequestController");

router.post(
  "/send/:status/:toUserId",
  authorize,
  connectionRequestController.sendConnectionRrequest
);

router.post(
  "/review/:status/:toUserId",
  authorize,
  connectionRequestController.reviewConnectionRequest
);

module.exports = router;
