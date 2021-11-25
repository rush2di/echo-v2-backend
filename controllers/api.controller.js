const ytdl = require("yt-mp3-dl");
const { playlistsDB } = require("../models");

const PLAYLISTDB_ERROR = "No playlist exists";

function apiPlaylistsGet(req, res) {
  playlistsDB
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw new Error(PLAYLISTDB_ERROR);
      } else {
        const data = snapshot.docs.map((doc) => doc.data());
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(404).json({ message: error.message || error });
    });
}

function apiPlaylistDetailsGet(req, res) {
  playlistsDB
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).json({ error: PLAYLISTDB_ERROR });
      } else {
        res.status(200).json(doc.data());
      }
    })
    .catch((error) => {
      res.status(404).json({ message: error.message || error });
    });
}

function apiTrackDownloadGet(req, res) {
  const trackID = req.params.id;

  ytdl(trackID).then((downloads) => {
    res.json(downloads[0]);
  });
}

function apiSourceDownloadGet(req, res) {
  const trackID = req.params.id;

  ytdl(trackID)
    .then((downloads) => {
      res.json(downloads);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

module.exports = {
  apiTrackDownloadGet,
  apiPlaylistDetailsGet,
  apiPlaylistsGet,
  apiSourceDownloadGet,
};
