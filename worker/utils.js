const youtube = require("scrape-youtube").default;

const { buildUrl } = require("cloudinary-build-url");
const { playlistsDB, Track } = require("../models");

const cloudinaryConstants = require("./constants").cloudinary;
const workerConstants = require("./constants").worker;

const {
  CLOUDINARY_CLOUDNAME,
  CLOUDINARY_EFFECT,
  CLOUDINARY_QUALITY,
  cloudinaryEffectsType,
  cloudinaryResizeParams,
} = cloudinaryConstants;

function setCloudinaryImage({ imgID, imgResize, imgEffect }) {
  const cloudName = CLOUDINARY_CLOUDNAME;
  const effect = CLOUDINARY_EFFECT;
  const quality = CLOUDINARY_QUALITY;
  const resize = imgResize;

  const transformationsBlur =
    effect === cloudinaryEffectsType.blur
      ? { effect, quality, resize }
      : { effect, quality };

  const transformationsDefault = { quality, resize };

  switch (imgEffect) {
    case cloudinaryEffectsType.blur:
      return buildUrl(imgID, {
        cloud: { cloudName },
        transformations: transformationsBlur,
      });
    default:
      return buildUrl(imgID, {
        cloud: { cloudName },
        transformations: transformationsDefault,
      });
  }
}

function getCloudinaryImageID(str) {
  const [titleMatch] = str.match(/(?<=Top\s).*/gi);
  return titleMatch.toLowerCase();
}

function removeInvalidChars(string) {
  return string.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );
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

      const id = res.videos[0].id;
      const rank = index + 1;
      const title = removeInvalidChars(track.title);
      const artist_name = removeInvalidChars(track.artist.name);
      const yt_title = removeInvalidChars(res.videos[0].title);
      const yt_link = res.videos[0].link.replace("https://youtu.be/", "");
      const preview = track.preview;

      const mutatedData = new Track(
        id,
        rank,
        title,
        artist_name,
        yt_title,
        yt_link,
        preview
      );

      return { ...mutatedData };
    })
  );
}

function getPlaylistData(playlistID) {
  return workerConstants.makeRequest.get("playlist/" + playlistID);
}

async function setPlaylistsDB(playlistID, playlistData) {
  try {
    await playlistsDB.doc(playlistID).set(playlistData);
  } catch (error) {
    logsHandler(error, "updateDB error");
  }
}

function assetsGenerator(title) {
  const picture = setCloudinaryImage({
    imgID: getCloudinaryImageID(title),
    imgResize: cloudinaryResizeParams.medium,
  });

  const picture_small = setCloudinaryImage({
    imgID: getCloudinaryImageID(title),
    imgResize: cloudinaryResizeParams.small,
    imgEffect: cloudinaryEffectsType.blur,
  });

  const picture_medium = setCloudinaryImage({
    imgID: getCloudinaryImageID(title),
    imgResize: cloudinaryResizeParams.medium,
  });

  const picture_big = setCloudinaryImage({
    imgID: getCloudinaryImageID(title),
    imgResize: cloudinaryResizeParams.big,
  });

  const picture_xl = setCloudinaryImage({
    imgID: getCloudinaryImageID(title),
    imgResize: cloudinaryResizeParams.xl,
  });

  return { picture, picture_small, picture_medium, picture_big, picture_xl };
}

module.exports = {
  setCloudinaryImage,
  getCloudinaryImageID,
  buildDebugTemplate,
  getPlaylistData,
  getYoutubeData,
  setPlaylistsDB,
  assetsGenerator,
};
