const fs = require("fs");
const path = require("path");
const moment = require("moment");
const schedule = require("node-schedule");
const { logsHandler } = require("../utils/commons");
const { Playlist, playlistsDB } = require("../models");

const workerConstants = require("./constants").worker;

const {
  buildDebugTemplate,
  getPlaylistData,
  getYoutubeData,
  assetsGenerator,
} = require("./utils");

const { targetIDs } = workerConstants;

function generatFormatedData(playlist, tracks) {
  const timestamp = moment().format("MMM Do YYYY").replace(" ", "-");
  const { picture, picture_small, picture_medium, picture_big, picture_xl } =
    assetsGenerator(playlist.data.title);

  const formatedData = new Playlist(
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

  return { ...formatedData };
}

async function initDatabaseUpdate(playlistID) {
  try {
    const playlist = await getPlaylistData(playlistID);
    const tracks = await getYoutubeData(playlist.data.tracks.data);
    const formatedData = generatFormatedData(playlist, tracks);

    await playlistsDB.doc(`${formatedData.id}`).set(formatedData);

    return formatedData;
  } catch (error) {
    console.log(error);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

function outputErrors(error, index) {
  const template = buildDebugTemplate(error, index);

  fs.appendFile(paths.logger, template, "utf-8", (error) =>
    logsHandler(
      error,
      "Error detected, check error-logs.txt for the complete log"
    )
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// let counter = 0;
// let dataArr = [];

// const job = schedule.scheduleJob(`*/3 * * * *`, function () {
//   logsHandler(null, `Started counter at ===> ${counter}`);

//   if (counter === 0 && fs.existsSync(paths.logger)) {
//     fs.unlink(paths.logger, (error) => logsHandler(error, "Old logs deleted"));
//   }

//   if (counter === targetIDs.length) {
//     logsHandler(null, "Done, Good bye!");
//     job.cancel();
//     counter = 0;
//     return;
//   }

//   initDatabaseUpdate(targetIDs[counter])
//     .then((data) => {
//       dataArr.push(data);
//       counter++;
//     })
//     .catch((error) => {
//       outputErrors(error, counter);
//     });
// });
