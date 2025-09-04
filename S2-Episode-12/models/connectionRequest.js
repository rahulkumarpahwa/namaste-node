const mongoose = require("mongoose");
const { User } = require("./userSchema");

const connectionRequestSchema = new mongoose.Schema(
  {
    // we will define here :
    // 1. sender user, which sends the request to the other user.
    //2. reciever user, which recieves the request from the reciever.
    //3. Status of relation : ignored, interested, accepted, rejected.

    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"], // Allowed values
        message: "{VALUE} is not a valid status", // Custom error message
      },
    },
  },
  {
    timestamps: true,
  }
);


// this is the middleware in the schema. It is called the 'pre' defined in the mongoose schema. here 'save' is the event before which it will take in action. don't use the arrow function. 
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this; // any instance of the ConectionRequestMOdel
  // check if the fromUserId is same as the toUserId.
  if (connectionRequest.toUserId.equals(connectionRequest.fromUserId)) {
    throw new Error("Sending Request to itself is not allowed!");
  }
  next(); // calling the next method of the middleware. must write this.
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequestModel",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
