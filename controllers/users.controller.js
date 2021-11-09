const { usersDB, User } = require("../models");

async function usersRegisterPost(req, res) {
  const userSchema = new User(
    req.body.uid,
    req.body.fullname,
    req.body.email,
    `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${req.body.fullname.replace(
      " ",
      "+"
    )}`,
    [],
    []
  );
  try {
    await usersDB.doc(`${req.body.uid}`).set({ ...userSchema });
    const response = await usersDB.doc(`${req.body.uid}`).get();
    if (!response.exists) {
      throw new Error("no data available currently");
    } else {
      res.status(200).json(response.data());
    }
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
}

async function userDataGet(req, res) {
  try {
    const response = await usersDB.doc(`${req.params.id}`).get();
    if (!response.exists) {
      throw new Error("no data available currently");
    } else {
      res.status(200).json(response.data());
    }
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
}

async function userAddLikesPost(req, res) {
  try {
    await usersDB
      .doc(`${req.body.id}`)
      .update({ liked_tracks: req.body.likedTracks });
    res.status(200);
  } catch (err) {
    res.status(404);
  }
}

async function userAddDownloadsPost(req, res) {
  try {
    await usersDB
      .doc(`${req.body.id}`)
      .update({ downladed_tracks: req.body.downladedTracks });
    res.status(200);
  } catch (err) {
    res.status(404);
  }
}

module.exports = {
  userDataGet,
  usersRegisterPost,
  userAddLikesPost,
  userAddDownloadsPost,
};
