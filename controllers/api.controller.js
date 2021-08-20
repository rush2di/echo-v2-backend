const db = require("../models/");

function api_playlists_get(req, res) {
  db.Playlist.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

function api_playlistDetails(req, res) {}

function api_trackDownload(req, res) {}

module.exports = {
  api_playlists_get,
  api_playlistDetails
};
