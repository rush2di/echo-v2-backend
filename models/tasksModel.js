const { extractTracks, removeInvalidChars } = require("../utils/tasksUtils");
const { logsHandler } = require("../utils/commons");
const mysql = require("mysql");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DP_HOST,
  user: process.env.DP_USERNAME,
  password: process.env.DP_PASSWORD,
  database: process.env.DP_NAME,
  charset: "utf8_general_ci",
});

function updateAllTracks(data) {
  let counter = 0;
  let excludedTracks = [];
  let tracksArray = extractTracks(data);

  for (let track in tracksArray) {
    const { title, artist_name, song_title, song_link, preview } =
      tracksArray[track];

    if (!excludedTracks.includes(song_link)) {
      const sqlQuery = `REPLACE INTO track (
        id, 
        title, 
        artist_name, 
        yt_title, 
        yt_link, 
        preview
        ) VALUES ( ?, ?, ?, ?, ?, ?)`;
      const queryValues = [
        counter,
        removeInvalidChars(title),
        removeInvalidChars(artist_name),
        removeInvalidChars(song_title),
        song_link,
        preview,
      ];
      db.query(sqlQuery, queryValues, (error, res) => logsHandler(error, res));
    }
    counter++;
    excludedTracks.push(song_link);
  }
}

function updateAllPlaylists(data) {
  let counter = 0;
  data.forEach(
    ({
      id,
      title,
      picture,
      picture_small,
      picture_medium,
      picture_big,
      picture_xl,
    }) => {
      const sqlQuery = `REPLACE INTO playlist (
        id, 
        playlist_key, 
        title, 
        picture, 
        picture_small, 
        picture_medium, 
        picture_big, 
        picture_xl, 
        last_update
        ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, NOW() )`;
      const queryValues = [
        counter++,
        id,
        title,
        picture,
        picture_small,
        picture_medium,
        picture_big,
        picture_xl,
      ];
      db.query(sqlQuery, queryValues, (error, res) => logsHandler(error, res));
    }
  );
}

function updatePlaylistTracks(data) {
  const refrence = extractTracks(data);
  let index = 0;

  for (let playlist in data) {
    data[playlist].tracks.forEach((track, rank) => {
      const sqlQuery = `REPLACE INTO playlist_tracks (
        id,
        playlist_key,
        track_id,
        rank
        ) VALUES ( ?, ?, ?, ? )`;
      const queryValues = [
        index++,
        data[playlist].id,
        refrence.find((ref) => ref.yt_link === track.song_link).id,
        rank,
      ];
      db.query(sqlQuery, queryValues, (error, res) => logsHandler(error, res));
    });
  }
}

module.exports = {
  updateAllTracks,
  updateAllPlaylists,
  updatePlaylistTracks,
};
