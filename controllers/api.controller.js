const ytdl = require("yt-mp3-dl");

function api_trackDownload(req, res) {
  const trackID = req.params.id;

  ytdl(trackID).then((downloads) => {
    res.status(200).redirect(downloads[0].url);
  });
}

module.exports = {
  api_trackDownload,
};
