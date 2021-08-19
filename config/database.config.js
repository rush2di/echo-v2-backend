const { Sequelize } = require("sequelize");
const { logsHandler } = require("../utils/commons");

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  define: {
    charset: process.env.DB_CHARSET,
    collate: process.env.DB_COLLATE,
  },
});

sequelize
  .authenticate()
  .then(() => {
    logsHandler(null, "Connection has been established successfully.");
  })
  .catch((err) => {
    logsHandler(null, `Unable to connect to the database ==> ${err}`);
  });

module.exports = sequelize;
