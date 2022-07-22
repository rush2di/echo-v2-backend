class User {
  constructor(
    id,
    user_fullname,
    user_email,
    user_avatar,
    liked_tracks,
    downloaded_tracks,
    picture = null,
    picture_small = null,
    picture_medium = null,
    picture_big = null,
    picture_xl = null
  ) {
    this.id = id;
    this.user_fullname = user_fullname;
    this.user_email = user_email;
    this.user_avatar = user_avatar;
    this.liked_tracks = liked_tracks;
    this.downloaded_tracks = downloaded_tracks;
    this.picture = picture;
    this.picture_small = picture_small;
    this.picture_medium = picture_medium;
    this.picture_big = picture_big;
    this.picture_xl = picture_xl;
  }
}

module.exports = { User };
