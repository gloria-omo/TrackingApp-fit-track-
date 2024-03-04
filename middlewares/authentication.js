const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()



const authenticate = async (req,res,next)=>{
    try{

        const hasAuthorization = req.headers.authorization

        if(!hasAuthorization){
            return res.status(400).json({
                error:"Authorization token not found"
            })
        }

        const token = hasAuthorization.split(" ")[1]
        // console.log(token)
        if(!token){
            return res.status(400).json({
                error: "Authorization not found"
            })
        }

        const decodeToken = jwt.verify(token, process.env.jwtSecret)
       
        

        const user = await userModel.findById(decodeToken.userId);

        
        if(!user){
            return res.status(404).json({
                error: "Authorization failed: user not found" 
            })
        }

        const check = user.blackList.includes(token);

        if(check){
            return res.status(400).json({
                error: "user logged Out"
            })
        }



        req.user = decodeToken;
        next()

    }catch(error){

        if(error instanceof jwt.JsonWebTokenError){
            return res.status(500).json({
                message: "session Timeout"
            })
        }

        res.status(500).json({
            error:error.message
        })
    }
}



module.exports = authenticate
    
// const session = require("express-session");

// exports.isloggedIn = async(req,res,next)=>{
//     if (!req.session.user){
//         return res.status(401).json({
//             message:"Not authorized to perform this action"
//         })
//     }
//     next();
//     }
