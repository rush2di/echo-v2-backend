class Track {
  constructor(id, title, artist_name, yt_title, yt_link, preview) {
    this.id = id;
    this.title = title;
    this.artist_name = artist_name;
    this.yt_title = yt_title;
    this.yt_link = yt_link;
    this.preview = preview;
  }
}

module.exports = { Track };
