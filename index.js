const express = require("express");
const db = require("./models");
const { test } = require("./models/");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/playlists/:id", (req, res) => {
  console.log(req.query);
});

test();
app.listen(port);
