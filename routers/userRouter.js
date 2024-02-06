const express = require("express");
const { signUp, logIn, getAll } = require("../controllers/userController");
const uploader = require("../helpers/multer");
const validation = require("../middlewares/validation");
const router = express.Router();



router.post("/sign-up",validation,uploader.single("profilePicture"),signUp);
router.post("/log-in",logIn);
router.get("/get-all",getAll);

module.exports = router 