const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

// router.get("/", async (req, res) => {
//   // res.send("works"); //to return html
//   // res.json("works");
//   const listOfPosts = await Posts.findAll();
//   res.json(listOfPosts);
// });

// router.get("/byId/:id", async (req, res) => {
//   const id = req.params.id;
//   const post = await Posts.findByPk(id);

//   res.json(post);
// });

router.post("/", async (req, res) => {
  const { username, password } = req.body; //take data from request (body)
  await bcrypt.hash(password, 8).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("user been created!");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body; //take data from request (body)

  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json("user doesn't exist");
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json("wrong password for this user");
      } else {
        res.json("success login");
      }
    });
  }
});

module.exports = router;
