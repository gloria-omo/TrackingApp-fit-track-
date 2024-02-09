const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../helpers/cloudinary");
const upload = require("../helpers/multer");
const jwt = require("jsonwebtoken");
const generateDynamicEmail = require("../helpers/index");
const sendEmail = require("../helpers/email");
require('dotenv').config()

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

       const user = await userModel.create({
        companyName,
        email:email.toLowerCase(),
        phoneNumber,
        password:hash,
        profilePicture: result.secure_url
       })

       
       const link = `${req.protocol}://${req.get('host')}/api/v1/verify-email/${user._id}`;
    //    console.log(link)

        const html = generateDynamicEmail(link, user.companyName.toUpperCase());
        await sendEmail({
            email: user.email,
            subject:'Kindly verify your account',
            html
        });

       //  Responding with a success message
       res.status(200).json({
        message: `User with email ${user.email} has been successfully created`,
        data: user
    });

        

    }catch(error){
        res.status(500).json({
            // error:`unable to sign-up ${error.message}`
            error: error.message
        })
    }
}



exports.logIn = async(req,res)=>{
    try{
        const {email,password} = req.body;

      const user = await userModel.findOne({email});
      if(!user){
        return res.status(404).json({
            message:"user not found"
        })
      }
      const checkPassword = await bcrypt.compareSync(password,user.password)
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
        res.status(500).json({
            error:error.message
        })
    }
}


exports.verify = async(req,res)=>{
    try{
const id = req.params.id
if(!id){
    return res.status(401).json({
        message:"Unknow user id "
    })
}

const user = await userModel.findByIdAndUpdate(id,{isVerify:true},{new:true})

res.status(200).json({
    message:`user with email:${user.email} is verify successfully`
    
})
}catch(error){
res.status(500).json({
    error: error.message
  })
} 

 }


exports.getAll = async(req,res)=>{
    try{
        // const id = req.session.user._id;
        const allUser = await userModel.find();
        if(allUser.length === 0){
            return res.status(200).json({
                message:"there are No user found"
            })
        }
        res.status(200).json({
            message:`There are ${allUser.length} user `,
            data:allUser
        })
 
    }catch(error){
        res.status(500).json({
           error:`${error.message}` 
        })
    }
}

exports.logOut = async(req,res)=>{
    try{
     req.session.destroy()
     res.status(200).json({
        message:"LogOut successfully"
     })
    }catch(error){
        res.status(500).json({
           error:`${error.message}` 
        })
    }
}



exports.forgotPassword = async(req,res)=>{
    try{
        // Extract user email from the req,body
        const {email} =req.body;

        // find user in the database

        const user = await userModel.findOne({email});

        // check if the user is existing in the database

        if(!user){
            return res.status(404).json({
                message:"user not found"

            })
        }
         // if a user is found generate a token

         const token = jwt.sign({userId:user._id},process.env.jwtSecret,{expiresIn:"10m"});
         console.log(token)

         const link = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${token}`;
        const html = generateDynamicEmail(link, user.companyName.toUpperCase());
        await sendEmail({
            email: user.email,
            subject:'reset password',
            html
        });

        // send a respond
        res.status(200).json({
            message:"reset password email sent successfully"
        });


    }
    catch(error){
        res.status(500).json({
           error: error.message
        })
    }
};

exports.resetPassword = async(req,res)=>{
    try{
        // get the token from the params
        const token = req.params.token;
        console.log(token)
        // Get the new password from  the body 
        const { newPassword, confirmPassword} = req.body;

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message : "incorrect passsword"
            })
        }

        console.log("decoding token");

        // verify the validity of the token 
       const decodedToken =  jwt.verify(token, process.env.jwtSecret);
       console.log(decodedToken);

    //    find the user of the token 

       const user = await userModel.findById(decodedToken.userId);

       if(!user){
        return res.status(404).json({
            message:"user not found"

        })
       };
       console.log(user);
    //    encrypt the user new psswword
       const salt =bcrypt.genSaltSync(10);
       const hash =bcrypt.hashSync(newPassword, salt);

       console.log(hash);
    //    updata the user password
       user.password = hash;

    //    save the changes to database
       await user.save();
    //    send a success message
    res.status(200).json({
        message:"password reset sucessfully",
        user
    })

    }
    catch(error){
        res.status(500).json({
            error:error.massage
        })
    }
}

        