const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
// const apiRoutes = require("./routes/api.routes.js");

dotenv.config()
require('./config/database.config')

require("./models/") 

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* 
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/playlists/:id", (req, res) => {
  console.log(req.query);
}); */

// app.use("/api", apiRoutes)

const port = process.env.PORT || 3000;
app.listen(port);
