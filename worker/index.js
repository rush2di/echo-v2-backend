const fs = require("fs");
const path = require("path");
const moment = require("moment");
const schedule = require("node-schedule");
const { logsHandler } = require("../utils/commons");
const { Playlist } = require("../models");

const workerConstants = require("./constants").worker;
const cloudinaryConstants = require("./constants").cloudinary;

const {
  getCloudinaryImageID,
  setCloudinaryImage,
  buildDebugTemplate,
  getPlaylistData,
  getYoutubeData,
  setPlaylistsDB,
} = require("./utils");

const { targetIDs } = workerConstants;
const { cloudinaryResizeParams, cloudinaryEffectsType } = cloudinaryConstants;

async function initDataFormatter(playlistID) {
  const playlist = await getPlaylistData(playlistID);
  const tracks = await getYoutubeData(playlist.data.tracks.data);
  const timestamp = moment().format("MMM Do YYYY").replace(" ", "-");

  const picture = setCloudinaryImage({
    imageID: getCloudinaryImageID(playlist.data.picture),
    resize: cloudinaryResizeParams.medium,
  });

  const picture_small = setCloudinaryImage({
    imageID: getCloudinaryImageID(playlist.data.picture_small),
    resize: cloudinaryResizeParams.small,
    effect: cloudinaryEffectsType.blur,
  });

  const picture_medium = setCloudinaryImage({
    imageID: getCloudinaryImageID(playlist.data.picture_medium),
    resize: cloudinaryResizeParams.medium,
  });

  const picture_big = setCloudinaryImage({
    imageID: getCloudinaryImageID(playlist.data.picture_big),
    resize: cloudinaryResizeParams.big,
  });

  const picture_xl = setCloudinaryImage({
    imageID: getCloudinaryImageID(playlist.data.picture_xl),
    resize: cloudinaryResizeParams.xl,
  });

  return new Playlist(
    playlist.data.id,
    playlist.data.title,
    picture,
    picture_small,
    picture_medium,
    picture_big,
    picture_xl,
    timestamp,
    tracks
  );
}

const paths = {
  logger: path.join(__dirname, `debug/error-log.txt`),
  outputDir: path.join(__dirname, `output/`),
};

function buildJSON(data) {
  const fileName = moment().format("MMM Do YYYY").replace(/\s/g, "-");
  const filePath = `${paths.outputDir + fileName}-test.json`;

  const output = JSON.stringify(data);

  fs.writeFile(filePath, output, "utf-8", (error) =>
    logsHandler(error, "Completed JSON creation")
  );
}

async function updateDB(data) {
  setPlaylistsDB(data.id, data);
}

function outputErrors(error, index) {
  const template = buildDebugTemplate(error, index);

  fs.appendFile(paths.logger, template, "utf-8", (error) =>
    logsHandler(
      error,
      "Error detected, check error-logs.txt for the complete log"
    )
  );
}

let counter = 0;
let dataArr = [];

const job = schedule.scheduleJob(`*/5 * * * *`, function () {
  logsHandler(null, `Started counter at ===> ${counter}`);

  if (counter === 0 && fs.existsSync(paths.logger)) {
    fs.unlink(paths.logger, (error) => logsHandler(error, "Old logs deleted"));
  }

  if (counter === targetIDs.length) {
    logsHandler(null, "Done, Good bye!");
    job.cancel();
    counter = 0;
    return;
  }

  initDataFormatter(targetIDs[counter])
    .then((data) => {
      dataArr.push(data);
      if (counter === targetIDs.length - 1) updateDB(dataArr);
      counter++;
    })
    .catch((error) => {
      outputErrors(error, counter);
      counter++;
    });
});
