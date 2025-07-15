const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { where } = require("sequelize");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body; //take data from request (body)
  const UserId = req.user.userId;

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });

  if (found) {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    }); //delete like
    res.json({ liked: false }); //result (needed to all work, like return)
  } else {
    await Likes.create({ PostId: PostId, UserId: UserId }); //crete like
    res.json({ liked: true }); //result (needed to all work, like return)
  }
});

module.exports = router;
