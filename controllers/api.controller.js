const db = require("../models/");
const ytdl = require("yt-mp3-dl");
const { QueryTypes } = require("sequelize");
const { logsHandler } = require("../utils/commons");

function api_playlists_get(req, res) {
  db.Playlist.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      logsHandler(null, err)
    });
}

function api_playlistDetails(req, res) {
  const playlistID = req.params.id;

  db.sequelize.query(
    "SELECT playlist.*, track.id AS `tracks.id`, track.title AS `tracks.title`, track.artist_name AS `tracks.artist_name`, track.yt_title AS `tracks.yt_title`, track.yt_link AS `tracks.yt_link`, track.preview AS `tracks.preview`, playlist_tracks.rank AS `tracks.rank` FROM playlist_tracks INNER JOIN track ON playlist_tracks.track_id =track.id INNER JOIN playlist ON playlist_tracks.playlist_key = playlist.id WHERE playlist.id = ?",
    {
      nest: true,
      type: QueryTypes.SELECT,
      replacements: [playlistID],
    }
  )
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    console.log(error);
  });

  // db.Playlist.findOne({
  //   where: {
  //     playlist_key: playlistID,
  //   },
  //   attributes: { exclude: ["createdAt", "updatedAt"] },
  //   include: [
  //     {
  //       model: db.Track,
  //       as: "tracks",
  //       attributes: [
  //         "id",
  //         "title",
  //         "artist_name",
  //         "yt_title",
  //         "yt_link",
  //         "preview",
  //       ],
  //     },
  //   ],
  // })
  
}

function api_trackDownload(req, res) {
  const trackID = req.params.id;
  ytdl(trackID).then((r) => res.status(200).redirect(r[0].url));
}

module.exports = {
  api_playlists_get,
  api_playlistDetails,
  api_trackDownload,
};
