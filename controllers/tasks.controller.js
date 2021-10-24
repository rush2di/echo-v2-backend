const db = require("../models/index");
const { logsHandler } = require("../utils/commons");
const { tracksData, playlistTracksData } = require("../utils/tasksUtils");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function updateAllTracks(data) {
  const dataArr = tracksData(data)
  try {
    await db.Track.drop({force: true});
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
    await db.PlaylistTracks.drop({force: true});
    await db.sequelize.sync();
    await db.PlaylistTracks.bulkCreate(dataArr, { individualHooks: true });
  } catch (error) {
    logsHandler(error, "Error detected while updating playlist tracks");
  } finally {
    logsHandler(null, "updatePlaylistTracks success");
    logsHandler(null, JSON.stringify(dataArr, null, 2))
    return;
  }
}

async function updateAllPlaylists(data) {
  let payload = data.map(
    ({
      id,
      title,
      picture,
      picture_small,
      picture_medium,
      picture_big,
      picture_xl,
    }) => ({
      playlist_key: id,
      title,
      picture,
      picture_small,
      picture_medium,
      picture_big,
      picture_xl,
    })
  );
  await db.Playlist.bulkCreate(payload);
}

module.exports = {
  updateAllTracks,
  updatePlaylistTracks
};
