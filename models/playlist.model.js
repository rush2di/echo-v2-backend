const sequelize = require("../config/database.config");
const { DataTypes } = require("sequelize");

const Playlist = sequelize.define(
  "playlist",
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    picture_small: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    picture_medium: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    picture_big: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    picture_xl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "playlist",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  }
);

module.exports = Playlist