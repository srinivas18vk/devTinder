const mongoose = require("mongoose");
const User = require("./userModel");

const ConnectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User, // reference to the User model
      required: [true, "fromUserId is required"],
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User, // reference to the User model
      required: [true, "toUserId is required"],
    },
    status: {
      type: String,
      required: [true, "status is required"],
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is of incorrect status type",
      },
    },
  },
  { timestamps: true }
);

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  ConnectionRequestSchema
);

module.exports = ConnectionRequest;
