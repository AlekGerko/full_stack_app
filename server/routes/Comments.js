const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// router.get("/", async (req, res) => {
//   // res.send("works"); //to return html
//   // res.json("works");
//   const listOfComments = await Comments.findAll();
//   res.json(listOfComments);
// });

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comment = await Comments.findAll({ where: { PostId: postId } });

  res.json(comment);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body; //take data from request (body)
  const username = req.user.username;
  comment.c_username = username;

  await Comments.create(comment); //crete comment

  res.json(comment); //result (needed to all work, like return)
});

module.exports = router;
