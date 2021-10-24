const { tracksData, playlistTracksData } = require("../utils/tasksUtils");

const { Playlist } = require("./Playlist.model");
const { Track } = require("./Track.model");
const { User } = require("./User.model");

// async function test(a) {
//   // await updateAllTracks(a);
//   // // await updatePlaylistTracks(a);
//   // tracksData(a)
//   playlistTracksData(a);
//   // logsHandler(tracksData(a).length)
// }

export { Track, Playlist, User };
