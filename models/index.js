const { Sequelize } = require("sequelize");
const sequelize = require("../config/database.config");
const { tracksData, playlistTracksData } = require("../utils/tasksUtils");

const Track = require("./track.model");
const Playlist = require("./playlist.model");
const PlaylistTracks = require("./playlistTracks.model");

Track.belongsToMany(Playlist, {
  through: PlaylistTracks,
  foreignKey: "track_id",
});

Playlist.belongsToMany(Track, {
  through: PlaylistTracks,
  foreignKey: "playlist_key",
});

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

const dbbb = require("../tasks/output/Aug-13th-2021-test.json");
const {
  updateAllTracks,
  updatePlaylistTracks,
} = require("../controllers/tasks.controller");
const { logsHandler } = require("../utils/commons");

async function test(a) {
  // await updateAllTracks(a);
  // // await updatePlaylistTracks(a);
  // tracksData(a)
  playlistTracksData(a)
  // logsHandler(tracksData(a).length)
}

test(dbbb);
