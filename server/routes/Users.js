const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

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
    res.json({ error: "user doesn't exist" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "wrong password for this user" });
      } else {
        // res.json({ error: "success login"});
        const accessToken = sign(
          //accessToken goes to Authmoddleware and creats user in 'req.user' with object below
          { username: user.username, userId: user.id },
          "personalSecretToken"
        );

        res.json({
          token: accessToken,
          username: user.username,
          id: user.id,
        });
      }
    });
  }
});

router.get("/validuser", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/userinfo/:id", async (req, res) => {
  const id = req.params.id;
  const userinfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] }, //make query to user table and return info without password
  });

  res.json(userinfo);
});

router.put("/chngpwd", validateToken, async (req, res) => {
  const { oldPwd, newPwd } = req.body; //take data from request (body) (old and new password)
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPwd, user.password).then(async (match) => {
    if (!match) {
      res.json({ error: "wrong old password! cant change it" });
    }

    bcrypt.hash(newPwd, 8).then(async (hash) => {
      await Users.update(
        { password: hash },
        { where: { id: req.user.userId } }
      );
      res.json("password has been updated!");
    });
  });

  // res.json(newText); //result (needed to all work, like return)
});

module.exports = router;
