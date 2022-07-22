const { usersDB } = require("../models");
const { userDataTemplate } = require("../utils/controllers");

const USERDB_ERROR = "No data available currently";

async function usersRegisterPost(req, res) {
  const userUID = req.body.uid;
  const userData = userDataTemplate(req.body);
  console.log(
    "register post",
    JSON.stringify({ userData, body: req.body }, null, 2)
  );

  try {
    await usersDB.doc(userUID).set(userData);
    const snapshot = await usersDB.doc(userUID).get();

    if (!snapshot.exists) throw new Error(USERDB_ERROR);

    res.status(200).json(snapshot.data());
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
}

async function userDataGet(req, res) {
  console.log("hello user");
  const userUID = req.params.id;

  try {
    const response = await usersDB.doc(userUID).get();

    if (!response.exists) throw new Error(USERDB_ERROR);

    res.status(200).json(response.data());
  } catch (error) {
    res.status(404).json({ message: error.message || error });
  }
}

async function userAddLikesPost(req, res) {
  const userUID = req.params.id;
  const likedTracks = req.body.likedTracks;

  try {
    await usersDB.doc(userUID).update({ liked_tracks: likedTracks });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
}

async function userAddDownloadsPost(req, res) {
  const userUID = req.params.id;
  const downloadedTracks = req.body.downloadedTracks;

  try {
    await usersDB.doc(userUID).update({ downloaded_tracks: downloadedTracks });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
}

module.exports = {
  userDataGet,
  usersRegisterPost,
  userAddLikesPost,
  userAddDownloadsPost,
};
