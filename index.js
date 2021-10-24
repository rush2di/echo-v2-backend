const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

require("./config/database.config");

const app = express();
const db = require("./models/");

db.sequelize.sync()

const apiRoutes = require("./routes/api.routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log([req.url,req.method])
  next();
});

app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port);
