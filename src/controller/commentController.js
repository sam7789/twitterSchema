const mongoose = require("mongoose");

const Comment = require("../models/comment.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate({
        path: "user",
        select: {
          firstname: 1,
          lastname: 1,
        },
      })
      .populate({
        path: "tweet",
        select: {
          tweet: 1,
        },
        populate: {
          path: "user",
          select: {
            firstname: 1,
            lastname: 1,
          },
        },
      })
      .lean()
      .exec();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate({
        path: "user",
        select: {
          firstname: 1,
          lastname: 1,
        },
      })
      .populate({
        path: "tweet",
        select: {
          tweet: 1,
        },
        populate: {
          path: "user",
          select: {
            firstname: 1,
            lastname: 1,
          },
        },
      })
      .lean()
      .exec();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate({
        path: "user",
        select: {
          firstname: 1,
          lastname: 1,
        },
      })
      .populate({
        path: "tweet",
        select: {
          tweet: 1,
        },
        populate: {
          path: "user",
          select: {
            firstname: 1,
            lastname: 1,
          },
        },
      })
      .lean()
      .exec();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
