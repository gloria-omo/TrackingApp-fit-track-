const express = require("express");
const { signUp } = require("../controllers/userController");
const uploader = require("../helpers/multer");
const router = express.Router();



router.post("/sign-up",uploader.single("profilePicture"),signUp);

module.exports = router 