const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world")
});

app.get("/playlists/:id", (req, res) => {
  console.log(req.query)
})

app.listen(3000);
