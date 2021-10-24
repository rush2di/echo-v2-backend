class User {
  constructor(
    id,
    user_firstName,
    user_lastName,
    picture,
    picture_small,
    picture_medium,
    picture_big,
    picture_xl,
    saved_tracks
  ) {
    this.id = id;
    this.user_firstName = user_firstName;
    this.user_lastName = user_lastName;
    this.picture = picture;
    this.picture_small = picture_small;
    this.picture_medium = picture_medium;
    this.picture_big = picture_big;
    this.picture_xl = picture_xl;
    this.saved_tracks = saved_tracks;
  }
}

module.exports = { User };
