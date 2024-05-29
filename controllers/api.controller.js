const poji_ytmp3 = require("youtube-to-mp3-poji");
const { playlistsDB } = require("../models");

const PLAYLISTDB_ERROR = "No playlist exists";

function apiPlaylistsGet(req, res) {
  console.log(req)
  playlistsDB
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw new Error(PLAYLISTDB_ERROR);
      } else {
        const data = snapshot.docs.map((doc) => doc.data());
        console.log(JSON.stringify(data, null, 2))
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(404).json({ message: error.message || error });
    });
}

function apiPlaylistDetailsGet(req, res) {
  console.log(req)
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
  console.log(req)
  const trackID = req.params.id;

  ytdl(trackID).then((downloads) => {
    res.json(downloads[0]);
  });
}

function apiSourceDownloadGet(req, res) {
  console.log(req)
  const trackID = req.params.id;

  poji_ytmp3("https://www.youtube.com/watch?v=" + trackID)
    .then((data) => {
      console.log({ data });
      res.json(data.data);
    })
    .catch((err) => {
      console.log({ err });
      res.status(403);
    });
}

module.exports = {
  apiTrackDownloadGet,
  apiPlaylistDetailsGet,
  apiPlaylistsGet,
  apiSourceDownloadGet,
};
