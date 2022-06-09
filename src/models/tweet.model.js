const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tweet: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model("tweet", tweetSchema);

module.exports = Tweet;
