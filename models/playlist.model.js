class Playlist {
  constructor(
    id,
    playlist_key,
    title,
    picture,
    picture_small,
    picture_medium,
    picture_big,
    picture_xl,
    playlist
  ) {
    this.id = id;
    this.playlist_key = playlist_key;
    this.title = title;
    this.picture = picture;
    this.picture_small = picture_small;
    this.picture_medium = picture_medium;
    this.picture_big = picture_big;
    this.picture_xl = picture_xl;
    this.playlist = playlist;
  }
}

module.exports = { Playlist };
