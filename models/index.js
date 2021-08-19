const { Sequelize } = require("sequelize");
const sequelize = require("../config/database.config");

const Track = require("./track.model");
const Playlist = require("./playlist.model");
const PlaylistTracks = require("./playlistTracks.model");

const db = {
  Track: Track,
  Playlist: Playlist,
  PlaylistTracks: PlaylistTracks,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// const data = require("../tasks/output/Aug-13th-2021-test.json");
// const testt = require("./tasks.model");

async function test() {
  try {
    await sequelize.authenticate();
    // await testt.test(data);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
test();

