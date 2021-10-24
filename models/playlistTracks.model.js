const sequelize = require("../config/database.config");
const { DataTypes } = require("sequelize");

const PlaylistTracks = sequelize.define(
  "playlist_tracks",
  {
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    timestamps: false
  }
);

module.exports = PlaylistTracks;
