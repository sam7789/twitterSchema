const express = require("express");
const cors = require("cors");
const app = express();

const usersController = require("./controller/usersController");
const tweetsController = require("./controller/tweetsController");
const commentsController = require("./controller/commentsController");

app.use(express.json());
app.use(cors());

app.use("/users", usersController);
app.use("/tweets", tweetsController);
app.use("/comments", commentsController);

module.exports = app;
