const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  // res.send("works"); //to return html
  // res.json("works");
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);

  res.json(post);
});

router.post("/", async (req, res) => {
  const post = req.body; //take data from request (body)
  await Posts.create(post); //crete post

  res.json(post); //result (needed to all work, like return)
});

module.exports = router;
