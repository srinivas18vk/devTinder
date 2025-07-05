const ConnectionRequest = require("../Models/connectionRequestModel");
const User = require("../Models/userModel");

exports.sendConnectionRrequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      throw new Error("invalid status type");
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      res.status(404).json({
        message: "User not found",
      });
    }

    if (fromUserId.equals(toUserId)) {
      throw new Error(" you cannot send connection request to yourself");
    }

    const isConnectionexists = await ConnectionRequest.findOne({
      $or: [
        { toUserId, fromUserId },
        { toUserId: fromUserId, fromUserId: toUserId },
      ],
    });
    if (isConnectionexists) {
      throw new Error("Connection already exists");
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    await connectionRequest.save();
    if (status === "interested") {
      res.status(200).json({
        message: `${req.user.firstName} is interested in ${toUser.firstName}`,
      });
    } else if (status === "ignored") {
      res.status(200).json({
        message: `${req.user.firstName}  ignored  ${toUser.firstName}`,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
      stack: err.stack,
    });
  }
};
