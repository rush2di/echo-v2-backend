const express = require("express");

require("./tasks/worker.js");
require("./models/factoryWorker.js");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world")
});

app.listen(3000);
