const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/like", likesRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("3001 server");
  });
});
