const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../helpers/cloudinary");
const upload = require("../helpers/multer")
const jwt = require("jsonwebtoken");

exports.signUp = async (req,res)=>{
    try{
        const { companyName,email,password,confrimPassword } = req.body
        const file = req.file.path

        const checkemail = await userModel.findOne({email});
        // console.log(checkemail)

        if(checkemail){
            return res.status(400).json({
                message:"email already exist sign-up with another email "
            })
        }
       
       if(password !== confrimPassword){
        return res.status(400).json({
            message:"incorrect passsword"
        })
       }


       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(password,salt);

       const result = await cloudinary.uploader.upload(file);
        console.log(result)

       const user = await userModel.create({
        companyName,
        email,
        password:hash,
        profilePicture: result.secure_url
       })

       res.status(200).json({
        message:"user created successfully",
        data:user
       })

    }catch(error){
        res.status(500).json({
            // error:`unable to sign-up ${error.message}`
            error: error.message
        })
    }
}