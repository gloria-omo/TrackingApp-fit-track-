const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../helpers/cloudinary");
const upload = require("../helpers/multer")
const jwt = require("jsonwebtoken");

exports.signUp = async (req,res)=>{
    try{
        const { companyName,email,phoneNumber,password,confrimPassword } = req.body
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
        phoneNumber,
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

exports.logIn = async(req,res)=>{
    try{
        const {email,password} = res.body;

      const user = userModel.findOne({email});
      if(!user){
        return res.status(404).json({
            message:"user not found"
        })
      }
      const checkPassword = bcrypt.compareSync(password,user.password)
      if(!checkPassword){
        return res.status(401).json({
            message:"incorrect password"
        })
      }
      req.session.user = user;
      
      res.status(200).json({
            message:"logIn successfully"
        })
      

    }catch(error){
        res.status(500),json({
            error:error.message
        })
    }
}