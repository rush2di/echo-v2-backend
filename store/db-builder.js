const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const youtube = require("scrape-youtube").default;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const apiInfo = {
  baseURL: "https://deezerdevs-deezer.p.rapidapi.com/",
  apiKey: process.env.API_KEY,
  playlistID: "playlist/1362512715",
};

const request = axios.create({
  baseURL: "https://deezerdevs-deezer.p.rapidapi.com/",
  timeout: 30000,
  headers: { "x-rapidapi-key": apiInfo.apiKey },
});

function getPlaylistData(playlistID) {
  return request.get(playlistID);
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
  fs.writeFile(`./store/output/${data.id}-test.json`, output, "utf8", (err) => {
    if (err) throw err;
    console.log("##################\nCompleted JSON creation");
  });
}

async function startTest() {
  const data = await initDataFormatter(apiInfo.playlistID);
  buildJSON(data);
}

// startTest();
