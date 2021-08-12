const express = require("express");

require("./factory/builder.js");
require("./models/builder.js");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world")
});

app.listen(3000);
