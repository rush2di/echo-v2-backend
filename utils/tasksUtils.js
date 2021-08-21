function removeInvalidChars(string) {
  return string.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );
}

function trackExists(arr, uniqueID) {
  return arr.some((obj) => {
    return obj.song_link === uniqueID;
  });
}

function extractTracks(data) {
  let counter = 0;
  const tracksArray = [];

  for (let playlist in data) {
    data[playlist].tracks.forEach((track) => {
      if (!trackExists(tracksArray, track.song_link)) {
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
      counter++;
    });
  }
  return tracksArray;
}

function tracksData(data) {
  const formatedData = [];
  const excludedTracks = [];
  const tracksArray = extractTracks(data);

  tracksArray.forEach( ({ title, artist_name, yt_title, yt_link, preview }) => {
    if (!excludedTracks.includes(yt_link)) {
      formatedData.push({
        title: removeInvalidChars(title),
        artist_name: removeInvalidChars(artist_name),
        yt_title: removeInvalidChars(yt_title),
        yt_link,
        preview,
      });
    }
    excludedTracks.push(yt_link);
  })
  return formatedData;
}

function playlistTracksData(data) {
  const formatedData = [];
  const refrence = extractTracks(data);

  data.forEach((playlist, index) => {
    const schema = playlist.tracks.map(({ song_link }, rank) => ({
      playlist_key: index + 1,
      track_id: refrence.find((ref) => ref.yt_link === song_link).id + 1, // + 1 should be removed after
      rank: rank + 1,
    }));
    formatedData.push(...schema);
  });

  return formatedData;
}

module.exports = {
  tracksData,
  playlistTracksData
};
