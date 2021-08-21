const db = require("../models/");
const ytdl = require('yt-mp3-dl')

function api_playlists_get(req, res) {
  db.Playlist.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

function api_playlistDetails(req, res) {
  const playlistID = req.params.id;

  db.Playlist.findOne({
    where: {
      playlist_key: playlistID,
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: db.Track,
        as: "tracks",
        attributes: [
          "id",
          "title",
          "artist_name",
          "yt_title",
          "yt_link",
          "preview",
        ],
      },
    ],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

function api_trackDownload(req, res) {
  const trackID = req.params.id;
  ytdl(trackID).then(r => res.json(r))
}

module.exports = {
  api_playlists_get,
  api_playlistDetails,
  api_trackDownload
};
