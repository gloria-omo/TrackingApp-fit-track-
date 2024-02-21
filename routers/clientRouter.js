const express = require("express");
const router = express.Router();
const { createClient, getAll } = require("../controllers/clientController");
const { checkTrialPeriod } = require("../controllers/userController");
const authenticate = require("../middlewares/authentication");

router.post("/addClient",authenticate,checkTrialPeriod,createClient);
router.get("/getAllMember",authenticate,getAll);


module.exports = router
