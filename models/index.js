const firebase = require("../config/database.config");
const firestore = firebase.firestore();

const { Playlist } = require("./Playlist.model");
const { Track } = require("./Track.model");
const { User } = require("./User.model");

const playlistsDB = firestore.collection("playlists");
const usersDB = firestore.collection("users");

export { Track, Playlist, User, playlistsDB, usersDB };
