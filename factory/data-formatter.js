const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const schedule = require("node-schedule");
const youtube = require("scrape-youtube").default;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const apiInfo = {
  baseURL: "https://deezerdevs-deezer.p.rapidapi.com/playlist/",
  apiKey: process.env.API_KEY,
};

const request = axios.create({
  baseURL: "https://deezerdevs-deezer.p.rapidapi.com/",
  timeout: 30000,
  headers: { "x-rapidapi-key": apiInfo.apiKey },
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

function getYoutubeData(title, artistName) {
  return youtube.search(`${title} ${artistName}`);
}

async function initDataFormatter(playlistID) {
  const playlist = await getPlaylistData(playlistID);

  const tracks = await Promise.all(
    playlist.data.tracks.data.map(async (track, index) => {
      const res = await getYoutubeData(track.title, track.artist.name);
      return {
        id: res.videos[0].id,
        rank: index + 1,
        title: track.title,
        artist_name: track.artist.name,
        song_title: res.videos[0].title,
        song_link: res.videos[0].link,
      };
    })
  );
  const newData = {
    id: playlist.data.id,
    title: playlist.data.title,
    picture: playlist.data.picture,
    picture_small: playlist.data.picture_small,
    picture_medium: playlist.data.picture_medium,
    picture_big: playlist.data.picture_big,
    picture_xl: playlist.data.picture_xl,
    last_update: moment().format("MMM Do YYYY"),
    tracks,
  };

  return newData;
}

function buildJSON(data) {
  let output = JSON.stringify(data);
  fs.writeFile(
    `./factory/output/${data.id}-test.json`,
    output,
    "utf8",
    (err) => {
      if (err) throw err;
      console.log("##################\nCompleted JSON creation");
    }
  );
}

let counter = 0;
const job = schedule.scheduleJob("*/1 * * * *", function () {
  console.log("############################\nStarted counter at ===>", counter);
  initDataFormatter(targetIDS[counter])
    .then((data) => {
      buildJSON(data);
      counter++;
    })
    .catch((err) => {
      console.log("############################\nError ===>", err);
      counter++;
    });
  if (counter === targetIDS.length - 1) {
    console.log("############################\nDone ===> Good bye! ");
    job.cancel();
  }
});


/**
 * /////////////////////////////////////////////////////////////////////
 * 
 * @bug fix [ Socket hang up, Error-code: "ECONNRESET" ] 
 * @bug Missing playlists w/ following indexes : 17, 26, 28, 29, 30 
 * 
 * /////////////////////////////////////////////////////////////////////
 * 
 * async function startTest() {
 *    const data = await initDataFormatter(targetIDS[0]);
 *    console.log(data);
 *    // buildJSON(data);
 * }
 *
 * startTest(); 
 * 
 *//////////////////////////////////////////////////////////////////////

