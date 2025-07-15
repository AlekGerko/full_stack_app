const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// router.get("/test", async (req, res) => {
//   // res.send("works"); //to return html
//   // res.json("works");
//   const listOfPosts = await Posts.findAll(); // find all posts
//   res.json(listOfPosts);
// });

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] }); // find all posts and likes (join 2 tables)
  const likedPosts = await Likes.findAll({
    where: { UserId: req.user.userId },
  }); // returns all likes to user
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);

  res.json(post);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body; //take data from request (body)
  post.username = req.user.username;
  post.UserId = req.user.userId;
  await Posts.create(post); //crete post

  res.json(post); //result (needed to all work, like return)
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("post deleted");
});

router.get("/byUserId/:userId", async (req, res) => {
  const id = req.params.userId;
  const listOfPostsByUserId = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });

  res.json(listOfPostsByUserId);
});

//update post
router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body; //take data from request (body)
  await Posts.update({ title: newTitle }, { where: { id: id } }); //crete post

  res.json(newTitle); //result (needed to all work, like return)
});

router.put("/posttext", validateToken, async (req, res) => {
  const { newText, id } = req.body; //take data from request (body)
  await Posts.update({ postText: newText }, { where: { id: id } }); //crete post

  res.json(newText); //result (needed to all work, like return)
});

module.exports = router;
