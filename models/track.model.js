class Track {
  constructor(
    id,
    rank,
    title,
    artist_name,
    artist_picture,
    yt_title,
    yt_link,
    preview,
    cover,
    cover_small,
    cover_medium,
    cover_big
  ) {
    this.id = id;
    this.rank = rank;
    this.title = title;
    this.artist_name = artist_name;
    this.artist_picture = artist_picture;
    this.yt_title = yt_title;
    this.yt_link = yt_link;
    this.preview = preview;
    this.cover = cover;
    this.cover_small = cover_small;
    this.cover_medium = cover_medium;
    this.cover_big = cover_big;
  }
}

module.exports = { Track };
