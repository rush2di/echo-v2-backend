const { Sequelize } = require('sequelize');

if (process.env.NODE_ENV !== "production") require("dotenv").config();


const sequelize = new Sequelize({
  host: process.env.DP_HOST,
  username: process.env.DP_USERNAME,
  password: process.env.DP_PASSWORD,
  database: process.env.DP_NAME,
  dialect: "mysql",
})

module.exports = sequelize;
global.sequelize = sequelize;