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
      if (trackExists(tracksArray, track.song_link)) {
        return;
      } else {
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

module.exports = {
  extractTracks,
  removeInvalidChars,
};
