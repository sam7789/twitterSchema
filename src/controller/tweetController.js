const express = require("express");

const Tweet = require("../models/tweet.model");
const Comment = require("../models/comment.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .populate({
        path: "user",
        select: {
          firstname: 1,
          email: 1,
        },
      })
      .lean()
      .exec();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const tweet = await Tweet.create(req.body);
    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
      .populate({
        path: "user",
        select: {
          firstname: 1,
          email: 1,
        },
      })
      .lean()
      .exec();
    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const tweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate({
        path: "user",
        select: {
          firstname: 1,
          email: 1,
        },
      })

      .lean()
      .exec();
    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Tweet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tweet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ tweet: req.params.id })
      .populate({
        path: "user",
        select: {
          firstname: 1,
          lastname: 1,
        },
      })
      .lean()
      .exec();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
