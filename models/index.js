const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const sequelize = require("../config/database.config");
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      /^((?!task).)*$/g.test(file) &&
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-9) === ".model.js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function test() {
  try {
    await sequelize.authenticate();
    const playlistTracks = await db.playlist_tracks.findAll({
      where: {
        playlist_key: "3155776842",
      }
    });    
    console.log("All tracks:", JSON.stringify(playlistTracks, null, 2));
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {db, test};
