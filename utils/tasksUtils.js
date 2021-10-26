const { logsHandler } = require("./commons");

function removeInvalidChars(string) {
  return string.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );
}

function extractTracks(data) {
  let counter = 1;
  const tracksArray = [];
  const excludedTracks = [];

  for (let playlist in data) {
    data[playlist].tracks.forEach((track) => {
      if (!excludedTracks.includes(`${track.title} ${track.artist_name}`)) {
        const result = {
          id: counter,
          title: track.title,
          artist_name: track.artist_name,
          yt_title: track.song_title,
          yt_link: track.song_link,
          preview: track.preview,
        };
        tracksArray.push(result);
      }
      excludedTracks.push(`${track.title} ${track.artist_name}`);
      counter++;
    });
  }
  return tracksArray;
}

function tracksData(data) {
  const formatedData = [];
  const tracksArray = extractTracks(data);

  tracksArray.forEach(
    ({ title, artist_name, yt_title, yt_link, preview }, index) => {
      formatedData.push({
        id: index + 1,
        title: removeInvalidChars(title),
        artist_name: removeInvalidChars(artist_name),
        yt_title: removeInvalidChars(yt_title),
        yt_link: yt_link.replace("https://youtu.be/", ""),
        preview,
      });
    }
  );
  return formatedData;
}

function playlistTracksData(data) {
  const formatedData = [];
  const refrence = tracksData(data);

  data.forEach((playlist, index) => {
    const schema = playlist.tracks.map((track, rank) => {
      const { title, artist_name } = track;

      const trackID = refrence.filter((ref) => {
        return `${artist_name} ${title}` == `${ref.artist_name} ${title}`;
      });

      if (!trackID.length) {
        throw new Error("playlistTracksData Error the trackID is not found");
      }

      return {
        playlist_key: index + 1,
        track_id: trackID[0].id,
        rank: rank + 1,
      };
    });
    formatedData.push(...schema);
  });
  logsHandler(
    null,
    "playlistTracksData formatedData[0] is ==>\n" +
      JSON.stringify(formatedData.slice(1000, 1005), null, 2)
  );
  return formatedData;
}

module.exports = {
  tracksData,
  playlistTracksData,
};
