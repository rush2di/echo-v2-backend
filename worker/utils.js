const youtube = require("scrape-youtube").default;

const { buildUrl } = require("cloudinary-build-url");
const { playlistsDB, Track } = require("../models");

const cloudinaryConstants = require("./constants").cloudinary;
const workerConstants = require("./constants").worker;

const {
  CLOUDINARY_CLOUDNAME,
  CLOUDINARY_EFFECT,
  CLOUDINARY_QUALITY,
  cloudinaryResizeParams,
  cloudinaryEffectsType,
} = cloudinaryConstants;

function setCloudinaryImage({ imageID, resize, effect }) {
  const cloudName = CLOUDINARY_CLOUDNAME;
  const effect = CLOUDINARY_EFFECT;
  const quality = CLOUDINARY_QUALITY;
  const resize = cloudinaryResizeParams;

  const transformationsBlur =
    effect === cloudinaryEffectsType.blur
      ? { effect, quality, resize }
      : { effect, quality };

  const transformationsDefault = { quality, resize };

  switch (effect) {
    case cloudinaryEffectsType.blur:
      return buildUrl(imageID, {
        cloud: { cloudName },
        transformations: transformationsBlur,
      });
    default:
      return buildUrl(imageID, {
        cloud: { cloudName },
        transformations: transformationsDefault,
      });
  }
}

function getCloudinaryImageID(str) {
  const [titleMatch] = str.match(/(?<=Top\s).*/gi);
  return titleMatch;
}

function buildDebugTemplate(error, errorindex) {
  const decorator = "#".repeat(30) + "\n";
  const loggedMsg = `Error in playlist with index ${errorindex}\n${error}\n`;

  return `${decorator + loggedMsg + decorator}\n`;
}

function getYoutubeData(data) {
  return Promise.all(
    data.map(async (track, index) => {
      const res = await youtube.search(track.title, track.artist.name);
      return new Track(
        res.videos[0].id,
        index + 1,
        track.title,
        track.artist.name,
        res.videos[0].title,
        res.videos[0].link,
        track.preview
      );
    })
  );
}

function getPlaylistData(playlistID) {
  return workerConstants.request.get("playlist/" + playlistID);
}

function setPlaylistsDB(playlistID, data) {
  return playlistsDB.doc(playlistID).set(data);
}

module.exports = {
  setCloudinaryImage,
  getCloudinaryImageID,
  buildDebugTemplate,
  getPlaylistData,
  getYoutubeData,
  setPlaylistsDB,
};
