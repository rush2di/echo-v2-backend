const { db } = require("../config/database.config");

const { Playlist } = require("./playlist.model");
const { Track } = require("./track.model");
const { User } = require("./user.model");

const playlistsDB = db.collection("playlists");
const usersDB = db.collection("users");

module.exports = { Track, Playlist, User, playlistsDB, usersDB };
