
const express = require("express");
const { signUp, logIn, getAll, logOut, verify, forgotPassword, resetPassword, updateSub, updateUser, } = require("../controllers/userController");
const upload = require("../helpers/multer");
const validation = require("../middlewares/validation");
// const { isloggedIn } = require("../middlewares/authentication");
const authenticate = require("../middlewares/authentication");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schema:
 *     user:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the book
 *         companyName:
 *           type: string
 *           description: The name of your company
 *         email:
 *           type: string
 *           description: The company email 
 *         phoneNumber:
 *           type: string
 *           description: Your phoneNumber  
 *         password:
 *           type: string
 *           description: The password 
 *         profilePicture:
 *           type: string
 *           description: image url 
 *         isVerify:
 *           type: boolean
 *           description: Whether user have verify their email 
 *         signUpStartDate:
 *           type: date
 *           description: check the day of sign up 
 *         blackList:
 *           type: array
 *           description: push in your token  
 *         isSubscription:
 *           type: boolean
 *           description: Whether user subscribed  
 *         trial:
 *           type: boolean
 *           description: Whether user is still on trial   
 *         SubscriptionDate:
 *           type: date
 *           description: check the day of subscription up 
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was updated
 *       example:
 *         id: d5fE_asz
 *         companyName: New Turing Omnibus
 *         email: john.snow@email.com
 *         phoneNumber: 09123456789
 *         password: 442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed
 *         profilePicture: https//cloudinary/yfbgfffffffdsfsdfgvvfsxsxddcsxss
 *         isVerify: false
 *         signUpStartDate: 2020-03-10T04:05:06.157Z
 *         backList: []
 *         isSubcribed: false
 *         subcriptionDate: 2020-03-10T04:05:06.157Z
 *         trial: true
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         companyName:
 *           type: string
 *           description: The name of your company
 *         email:
 *           type: string
 *           description: The company email 
 *         phoneNumber:
 *           type: string
 *           description: Your phoneNumber  
 *         password:
 *           type: string
 *           description: The password 
 *         confirmPassword:
 *           type: string
 *           description: confirm password 
 *         profilePicture:
 *           type: string
 *           format: binary
 *           description: Profile picture image data (base64 encoded or file path)
 *       example:
 *         companyName: New Turing Omnibus
 *         email: john.snow@email.com
 *         phoneNumber: 09123456789
 *         password: 442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed
 *         confirmPassword: 442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed
 *         profilePicture: base64_encoded_image_data_or_file_path
 */


/**
 * @swagger
 * /api/v1/sign-up:
 *  post:
 *      summary: To create a new user
 *      description: this api is use to add data to the database
 *      requestBody:
 *          required: true
 *          content:
 *               multipart/form-data:
 *                   schema:
 *                       $ref: '#components/schemas/user'
 *      responses:
 *          200:
 *              description: user created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                             $ref: '#components/schema/user'
 * 
 */
router.post("/sign-up",upload.single("profilePicture"),validation,signUp);


/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '401':
 *         description: Unauthorized, invalid credentials
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         password:
 *           type: string
 *           format: password
 *           description: The password for the user
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Authentication token for the user session
 *         user:
 *           $ref: '#/components/schema/user'
 */

router.post("/login",logIn);


/**
 * @swagger
 * /api/v1/getAll:
 *  get:
 *      summary: To get all users
 *      description: this api is use to fetch all user data from the database
 *      security:
 *        - BearerAuth: []
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                             $ref: '#components/schema/user'
 * securitySchemes:
 *   BearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */
router.get("/getAll",authenticate,getAll);
router.post("/logOut",authenticate,logOut);
router.put("/updatasubscription/:id",authenticate,updateSub);
router.put("/updateUser",authenticate,updateUser);
/**
 * @swagger
 * /api/v1/verifyEmail/{id}/{token}:
 *  get:
 *      summary: To get all users
 *      description: this api is use to fetch data for the database
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: mongoose id required
 *            schema: 
 *                type: string   
 *      responses:
 *          200:
 *              description: sucessful
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                             $ref: '#components/schema/user'
 * 
 */
router.get("/verifyEmail/:id/:token",verify);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword/:token",resetPassword);
// router.get("/checkperiod/:id",checkTrialPeriod);

module.exports = router  