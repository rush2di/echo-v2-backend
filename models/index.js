const { Sequelize } = require("sequelize");
const sequelize = require("../config/database.config");

const Track = require("./track.model");
const Playlist = require("./playlist.model");
const PlaylistTracks = require("./playlistTracks.model");

Track.belongsToMany(Playlist, {
  through: "playlist_tracks",
  as: "playlists",
  foreignKey: "track_id",
});

Playlist.belongsToMany(Track, {
  through: "playlist_tracks",
  as: "tracks",
  foreignKey: "playlist_key",
});

const db = {
  Track: Track,
  Playlist: Playlist,
  PlaylistTracks: PlaylistTracks
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;