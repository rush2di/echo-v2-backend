const express = require("express");

const apiController = require("../controllers/users.controller");

const router = express.Router();

router.post("/register/:id", apiController.usersRegisterPost);
router.get("/auth/:id", apiController.userDataGet);

module.exports = router;
