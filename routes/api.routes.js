const express = require("express");

const apiController = require("../controllers/api.controller");
 
const router = express.Router();

router.get("/playlists", apiController.api_playlists_get)
router.get("/playlists/:id", apiController.api_playlistDetails)
router.get("/track/:id", apiController.api_trackDownload)

module.exports = router