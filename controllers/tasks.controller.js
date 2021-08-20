const db = require("../models/index");
const { logsHandler } = require("../utils/commons");
const { tracksData, playlistTracksData } = require("../utils/tasksUtils");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function updateAllTracks(data) {
  const dataArr = tracksData(data)
  try {
    await db.Track.drop();
    await db.sequelize.sync();
    await db.Track.bulkCreate(dataArr, { individualHooks: true });
  } catch (error) {
    logsHandler(error, "Error detected while updating tracks");
  } finally {
    logsHandler(null, "updateAllTracks success");
    return;
  }
}

async function updatePlaylistTracks(data) {
  const dataArr = playlistTracksData(data)
  try {
    await db.PlaylistTracks.drop();
    await db.sequelize.sync();
    await db.PlaylistTracks.bulkCreate(dataArr, { individualHooks: true });
  } catch (error) {
    logsHandler(error, "Error detected while updating playlist tracks");
  } finally {
    logsHandler(null, "updatePlaylistTracks success");
    return;
  }
}

module.exports = {
  updateAllTracks,
  updatePlaylistTracks
};
