const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/', async (req, res) => {
    // res.send("works"); //to return html
    // res.json("works");
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.post('/', async (req, res) => {
    const post = req.body; //take data from request (body)
    await Posts.create(post); //crete post

    res.json(post); //result (needed to all work, like return)
});

module.exports = router;