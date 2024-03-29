const express = require("express");
const router = express.Router();
const { createClient, getAll, getOne, calculateRemainingDays, createPlan, batchOnboard, deleteUser, cronMiddleware, getAllActiveMember, getAllNonActiveMember, getAllUsersWithOneMonthPlan, getAllUsersWithTwoMonthPlan, getAllUsersWithThreeMonthPlan,  } = require("../controllers/clientController");
const { checkTrialPeriod } = require("../controllers/userController");
const authenticate = require("../middlewares/authentication");


router.post("/addClient",authenticate,checkTrialPeriod,createClient);
router.put("/addPlan/:id",authenticate,checkTrialPeriod,createPlan);
router.get("/getAllMember",authenticate,getAll);
router.get("/getAllActiveMember",authenticate,getAllActiveMember);
router.get("/getAllNonActiveMember",authenticate,getAllNonActiveMember);
router.get("/getAllOneMonthPlan",authenticate,getAllUsersWithOneMonthPlan);
router.get("/getAllThreeMonthPlan",authenticate,getAllUsersWithThreeMonthPlan);
router.get("/getAllTwoMonthPlan",authenticate,getAllUsersWithTwoMonthPlan);
router.get("/getoneMember",authenticate,checkTrialPeriod,getOne);
router.post("/createBulkUser",authenticate,checkTrialPeriod,batchOnboard);
router.get("/daysremainingCron/:id",authenticate,checkTrialPeriod,cronMiddleware);
router.get("/daysremaining/:id",authenticate,checkTrialPeriod,calculateRemainingDays);
router.delete("/delete/:id",authenticate,checkTrialPeriod,deleteUser);



module.exports = router
