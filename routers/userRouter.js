const express = require("express");
const { signUp, logIn, getAll, logOut, verify, forgotPassword, resetPassword, } = require("../controllers/userController");
const upload = require("../helpers/multer");
const validation = require("../middlewares/validation");
// const { isloggedIn } = require("../middlewares/authentication");
const authenticate = require("../middlewares/authentication");
const router = express.Router();



router.post("/sign-up",upload.single("profilePicture"),validation,signUp);
router.post("/login",logIn);
router.get("/getAll",authenticate,getAll);
router.post("/logOut",authenticate,logOut);
router.get("/verifyEmail/:id",verify);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword/:token",resetPassword);
// router.get("/checkperiod/:id",checkTrialPeriod);

module.exports = router  