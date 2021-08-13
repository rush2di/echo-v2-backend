const mysql = require("mysql");
const { logsHandler } = require("../utils/commons");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const db = mysql.createConnection({
  host: process.env.DP_HOST,
  user: process.env.DP_USERNAME,
  password: process.env.DP_PASSWORD,
});

// CREATE DATABASE
db.connect((error) => {
  logsHandler(error, "DB connected!");
  db.query("CREATE DATABASE IF NOT EXISTS echoApp", (error) =>
    logsHandler(error, "DB created")
  );
});
