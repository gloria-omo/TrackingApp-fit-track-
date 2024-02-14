// const userModel = require("../models/onboardingmodel")
// const jwt = require("jsonwebtoken")
// require("dotenv").config()



// const authenticate = async (req,res,next)=>{
//     try{

//         const hasAuthorization = req.headers.authorization

//         if(!hasAuthorization){
//             return res.status(400).json({
//                 error:"Authorization token not found"
//             })
//         }

//         const token = hasAuthorization.split(" ")[1]

//         if(!token){
//             return res.status(400).json({
//                 error: "Authorization not found"
//             })
//         }

//         const decodeToken = jwt.verify(token, process.env.jwtKey)

        

//         const user = await userModel.findById(decodeToken.userId)
//         console.log(user.blackList)

//         const check = user.blackList.includes(token);

//         if(check){
//             return res.status(400).json({
//                 error: "user logged Out"
//             })
//         }


//         if(!user){
//             return res.status(404).json({
//                 error: "Authorization failed: user not found" 
//             })
//         }

//         req.user = decodeToken;
//         next()

//     }catch(error){

//         if(error instanceof jwt.JsonWebTokenError){
//             return res.json({
//                 message: "session Timeout"
//             })
//         }

//         res.status(500).json({
//             error:error.message
//         })
//     }
// }



// module.exports = authenticate
    
// const session = require("express-session");

exports.isloggedIn = async(req,res,next)=>{
    if (!req.session.user){
        return res.status(401).json({
            message:"Not authorized to perform this action"
        })
    }
    next();
    }
