const { db } = require("../config/database.config");

const { Playlist } = require("./Playlist.model");
const { Track } = require("./Track.model");
const { User } = require("./User.model");

const playlistsDB = db.collection("playlists");
const usersDB = db.collection("users");

module.exports = { Track, Playlist, User, playlistsDB, usersDB };
