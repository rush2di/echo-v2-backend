const fs = require("fs");
const path = require("path");
const axios = require("axios");
const moment = require("moment");
const schedule = require("node-schedule");
const youtube = require("scrape-youtube").default;
const { logsHandler } = require("../utils/commons");
const { updateAllTracks, updateAllPlaylists, updatePlaylistTracks } = require("../models/taskModel.js");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const apiInfo = {
  apiKey: process.env.API_KEY,
};

const request = axios.create({
  baseURL: "https://deezerdevs-deezer.p.rapidapi.com/",
  headers: { "x-rapidapi-key": apiInfo.apiKey },
  timeout: 30000,
});

const targetIDS = [
  3155776842, 1313621735, 1109890291, 1111143121, 1116190041, 1362512715,
  1116189381, 1362518525, 1111142221, 1111141961, 1116188451, 1652248171,
  1111142361, 1362511155, 1362528775, 1362525375, 1362510315, 1362526495,
  1362501615, 1362501235, 1362501015, 1313619455, 1313620765, 1313618905,
  1313619885, 1266968331, 1313617925, 1313616925, 1116189071, 1116187241,
  1266971851, 1221034071,
];

function getPlaylistData(playlistID) {
  return request.get("playlist/" + playlistID);
}

function getYoutubeData(data) {
  return Promise.all(
    data.map(async (track, index) => {
      const res = await youtube.search(track.title, track.artist.name);
      return {
        id: res.videos[0].id,
        rank: index + 1,
        title: track.title,
        artist_name: track.artist.name,
        song_title: res.videos[0].title,
        song_link: res.videos[0].link,
        preview: track.preview,
      };
    })
  );
}

async function initDataFormatter(playlistID) {
  const playlist = await getPlaylistData(playlistID);
  const tracks = await getYoutubeData(playlist.data.tracks.data);

  return {
    id: playlist.data.id,
    title: playlist.data.title,
    picture: playlist.data.picture,
    picture_small: playlist.data.picture_small,
    picture_medium: playlist.data.picture_medium,
    picture_big: playlist.data.picture_big,
    picture_xl: playlist.data.picture_xl,
    last_update: moment().format("MMM Do YYYY").replace(" ", "-"),
    tracks,
  };
}

const paths = {
  logger: path.join(__dirname, `debug/error-log.txt`),
  outputDir: path.join(__dirname, `output/`),
};

function buildJSON(data) {
  const output = JSON.stringify(data);
  const filePath = `${paths.outputDir}${moment()
    .format("MMM Do YYYY")
    .replace(/\s/g, "-")}-test.json`;

  fs.writeFile(filePath, output, "utf-8", (error) =>
    logsHandler(error, "Completed JSON creation")
  );
}

function updateDB(data) {
  updateAllTracks(data);
  updatePlaylistTracks(data);
}

function outputErrors(error, i) {
  const decorator = "#".repeat(30) + "\n";
  const loggedMsg = `Error in playlist with index ${i}\n${error}\n`;
  const template = `${decorator + loggedMsg + decorator}\n`;

  fs.appendFile(paths.logger, template, "utf-8", (error) =>
    logsHandler(
      error,
      "Error detected, check error-logs.txt for the complete log"
    )
  );
}

// let counter = 0;
// let dataArr = [];

// const job = schedule.scheduleJob(`*/5 * * * *`, function () {
//   logsHandler(null, `Started counter at ===> ${counter}`);

//   if (counter === 0 && fs.existsSync(paths.logger)) {
//     fs.unlink(paths.logger, (error) => logsHandler(error, "Old logs deleted"));
//   }

//   if (counter === targetIDS.length) {
//     logsHandler(null, "Done, Good bye!");
//     job.cancel();
//     counter = 0;
//     return;
//   }

//   initDataFormatter(targetIDS[counter])
//     .then((data) => {
//       dataArr.push(data);
//       if (counter === targetIDS.length - 1) updateDB(dataArr);
//       counter++;
//     })
//     .catch((error) => {
//       outputErrors(error, counter);
//       counter++;
//     });
// });