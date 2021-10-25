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
    last_update,
    tracks
  ) {
    this.id = id;
    this.playlist_key = playlist_key;
    this.title = title;
    this.picture = picture;
    this.picture_small = picture_small;
    this.picture_medium = picture_medium;
    this.picture_big = picture_big;
    this.picture_xl = picture_xl;
    this.last_update = last_update;
    this.tracks = tracks;
  }
}

module.exports = { Playlist };
