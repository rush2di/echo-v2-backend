const express = require("express");

const apiController = require("../controllers/api.controller");

const router = express.Router();

router.get("/playlists", apiController.apiPlaylistsGet);
router.get("/playlists/:id", apiController.apiPlaylistDetailsGet);
router.get("/track/:id", apiController.apiTrackDownloadGet);
router.get("/download/track/:id", apiController.apiSourceDownloadGet);

module.exports = router;
