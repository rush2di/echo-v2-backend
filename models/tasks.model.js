const db = require("../models/index");
const { logsHandler } = require("../utils/commons");
const { tracksData, playlistTracksData } = require("../utils/tasksUtils");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function updateAllTracks(data) {
  try {
    await db.track.drop();
    await db.sequelize.sync();
    await db.track.bulkCreate(tracksData(data));
  } catch (error) {
    logsHandler(error, "Error detected while updating tracks");
  } finally {
    logsHandler(error, "updateAllTracks success");
    return;
  }
}

async function updatePlaylistTracks(data) {
  try {
    await db.playlist_tracks.drop();
    await db.sequelize.sync();
    await db.playlist_tracks.bulkCreate(playlistTracksData(data));
  } catch (error) {
    logsHandler(error, "Error detected while updating playlist tracks");
  } finally {
    logsHandler(error, "updatePlaylistTracks success");
    return;
  }
}

module.exports = {
  updateAllTracks,
  updatePlaylistTracks,
};
