const express = require("express");
const { getYTID } = require("./factory/data-formatter");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world")
});

app.listen(3000);
