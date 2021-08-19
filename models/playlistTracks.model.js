const sequelize = require("../config/database.config");
const { DataTypes } = require("sequelize");
const Playlist = require("./playlist.model")

const PlaylistTracks = sequelize.define(
  "playlist_tracks",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    playlist_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    track_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "playlist_tracks",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
      {
        name: "track_id",
        using: "BTREE",
        fields: [{ name: "track_id" }],
      },
      {
        name: "playlist_key",
        using: "BTREE",
        fields: [{ name: "playlist_key" }],
      },
    ],
  }
);

module.exports = PlaylistTracks
