const express = require("express");
const { signUp, logIn, getAll, logOut, verify, forgotPassword, resetPassword } = require("../controllers/userController");
const uploader = require("../helpers/multer");
const validation = require("../middlewares/validation");
const { isloggedIn } = require("../middlewares/authentication");
const router = express.Router();



router.post("/sign-up",validation,uploader.single("profilePicture"),signUp);
router.post("/log-in",logIn);
router.get("/get-all",isloggedIn,getAll);
router.get("/log-in",isloggedIn,logOut);
router.get("/verify-email/:id",verify);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);

module.exports = router 