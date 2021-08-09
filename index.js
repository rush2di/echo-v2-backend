const express = require("express");
const { getYTID } = require("./store/db-builder");

const app = express();

//getYTID("Hkaya Snore")

app.get("/", (req, res) => {
  /* getYTID("Hkaya Snore", async (err, data) => {
      let ndata = await data;
      res.send(JSON.stringify(ndata.items[0].id.videoId, null, 2) )
  }) */
  res.send("hello world")
});

app.listen(3000);
