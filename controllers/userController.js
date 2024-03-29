const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../helpers/cloudinary");
const upload = require("../helpers/multer");
// const session = require("express-session");
const jwt = require("jsonwebtoken");
const generateDynamicEmail = require("../helpers/index");
const resetPasswordEmail = require("../helpers/resetindex")
const sendEmail = require("../helpers/email");
const { date } = require("joi");
require('dotenv').config()

exports.signUp = async (req,res)=>{
    try{

        const { companyName,email,phoneNumber,password,confirmPassword } = req.body
        if(!{ companyName,email,phoneNumber,password,confirmPassword }){
         return res.status(400).json({
            message:"Invaild format fields must not be left empty"
         })
        }

        // Function to validate company name
      function validateCompanyName(companyName) {
     const regex = /^[a-zA-Z\s]+$/;
      return regex.test(companyName);
    }
      
    if (!validateCompanyName(companyName)) {
        return res.status(400).json({
             message: 'Company name must contain only alphabet characters' 
            });
    }

      // Function to validate phone number
      function validatephoneNumber(phoneNumber) {
        const regex = /^[0-9]+$/;
         return regex.test(phoneNumber);
       }

       if (!validatephoneNumber(phoneNumber)) {
        return res.status(400).json({
             message: 'phone Number must contain only numbers' 
            });
    }

       
    // console.log(req.file.mimetype)
        const file = req.file.path;
        // if (req.file.mimetype!='image/.jpg') {
        //     return res.status(500).json("Unsupported file format")
        // } 

        // if(!req.file.mimetype.startsWith('image/') ){ 
        //     return res.status(400).json({
        //         message:"File type not supported, Image only" 
        //     })
        // }
        const result = await cloudinary.uploader.upload(file);
    //    console.log(result);

 // Function to validate email 
 function validateEmail(email) {
    const regex = /^[^\s@]+@gmail\.com$/;
    // const regex = /^[^\s@]+@(gmail\.com|email\.com|yahoo\.com)$/;

    return regex.test(email);
}
if (!validateEmail(email)) {
    return res.status(400).json({
         message:  'Invalid email address'  
        });
}
        const checkemail = await userModel.findOne({email});
        // console.log(checkemail)
        if(checkemail){
            return res.status(400).json({
                message:"Email already exist sign-up with another email "
            })
        }

        if(!password){
          return res.status(400).json({
            message:"Password should not be empty please input a password"
          })
        }
        if(password <= 8){
            return res.status(400).json({
                message:"Password must not be less than 8"
            })
        }       
       if(password !== confirmPassword){
        return res.status(400).json({
            message:" Password and confirm password not a match"
        })
       }
       const salt = await bcrypt.genSaltSync(10);
       const hash = await bcrypt.hashSync(password,salt);


       const user = await userModel.create({
        companyName,
        email:email.toLowerCase(),
        phoneNumber,
        password:hash,
        profilePicture: result.secure_url
       })
     
       const token = jwt.sign({userId:user._id},process.env.jwtSecret,{expiresIn:"10m"});
       
       const link = `${req.protocol}://${req.get('host')}/api/v1/verifyEmail/${user._id}/${token} `;
       console.log(`${req.get('host')}`)

        const html =await generateDynamicEmail(link, user.companyName.toUpperCase());
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
        if(!{email,password}){
            return res.status(400).json({
                message: "Invaild format : Field should not be empty"
            })
        }

      const user = await userModel.findOne({email:email.toLowerCase()});
      if(!user){
        return res.status(404).json({
            message:"User not found"
        })
      }
      if(user.isVerify !== true){
        return res.status(400).json({
            message:`Kindly verify you email with the link send to ${user.email}`
        })
      }

      const checkPassword = await bcrypt.compareSync(password,user.password)
      if(!checkPassword){
        return res.status(401).json({
            message:"Incorrect password"
        })
      }
       //generate a token for the user
       const token = jwt.sign({
        userId: user._id,
        email: user.email
    }, process.env.jwtSecret, {expiresIn: "1d"})

      res.status(200).json({
            message:"LogIn successfully",
            data: user,
            token
        })
      

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}


exports.verify = async(req,res)=>{
    try{
  const id = req.params.id;

  if(!id){
    return res.status(401).json({
        message:"Unknown user id "
    })
}
  const token = req.params.token;
   
  const decodedToken = jwt.verify(token,process.env.jwtSecret)

  if (!decodedToken){
    const token = jwt.sign({userId:user._id},process.env.jwtSecret,{expiresIn:"10m"});
       
    const link = `${req.protocol}://${req.get('host')}/api/v1/verifyEmail/${user._id}/${token} `;
    const html =await generateDynamicEmail(link, user.companyName.toUpperCase());
    await sendEmail({
        email: user.email,
        subject:'Kindly verify your account',
        html
    });

}


const user = await userModel.findByIdAndUpdate(id,{isVerify:true},{new:true})

// res.status(200).json({
//     message:`User with email:${user.email} is verify successfully`
    
// })


  res.status( 200 ).redirect( `https://plan-pulse.vercel.app/#/user-login` );
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
                message:"There are No user found"
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

//update a user function
exports.updateUser = async (req,res)=>{
    try{
    
        //get the user id
        const id = req.user.userId
    
        //instance of what the user can update
        const data = {
            companyName: req.body.companyName,
            phoneNumber: req.body.phoneNumber
        }
    
        //update the user
        const updateData = await userModel.findByIdAndUpdate(id,data,{new:true})
    
        //throw a response
        res.status(200).json({
            message: "User updated successfully",
            updateData
        })
    
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
    }  



//logout function
exports.logOut = async(req,res)=>{
    try {
        // get the token 
        const hasAuthor = req.headers.authorization

        // extract the token
        const token = hasAuthor.split(" ")[1]

        //get the users id
        const id = req.user.userId

        // find the user 
        const user = await userModel.findById(id) 

        //check if the user exist
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        }

        // log the user out by pushing the token to blackList
        user.blackList.push(token)
        await user.save()

        // thow a response
        res.status(200).json({
            message:"Successfully logedOut"
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
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
                message:"User not found"

            })
        }
         // if a user is found generate a token

         const token = jwt.sign({userId:user._id},process.env.jwtSecret,{expiresIn:"10m"});
         console.log(token)

         const link = `HTTPS://plan-pulse.vercel.app/#/reset-form/${token}`;
        const html = resetPasswordEmail(link, user.companyName.toUpperCase());
        await sendEmail({
            email: user.email,
            subject:'Reset password',
            html
        });

        // send a respond
        res.status(200).json({
            message:"Reset password email sent successfully"
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
                message : " Password and confirm password not a match"
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
            message:"User not found"

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
        message:"Password reset sucessfully",
        data: user
    })

    }
    catch(error){
        res.status(500).json({
            error:error.massage
        })
    }
}

exports.updateSub =async(req,res)=>{
    try{
        const id = req.params.id;
       
        // const user = await userModel.findById(id);

       const updataUser = await userModel.findByIdAndUpdate(id,{
            trial: false,
            isSubscribed: true,
            SubscriptionDate: Date.now()
        },{new:true});
        await updataUser.save();
        res.status(200).json({
            message:'Subscription successfully'
        })


    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

exports.checkTrialPeriod = async(req,res,next)=>{
  try{
     const id = req.user.userId;

     const user = await userModel.findById(id)
     if(!user){
        return res.status(400).json({
            message:"Not a user"
        })
     }

     if(!user.trial){
        function getDaysSinceRegistration(registrationDate) {
            const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
            const currentDate = new Date();
            const diffDays = Math.round(Math.abs((currentDate - registrationDate) / oneDay));
            return diffDays;
        };
        const daySinceSignUp = getDaysSinceRegistration(user.signUpStartDate)
             console.log(daySinceSignUp);
            if (daySinceSignUp <= 90){
                next()
            }else {
                return res.status(400).json({
                   message: " Your subscription period is over kindly subcribe for a new plan " 
                })
            }
     }


// Function to calculate the number of days between two dates
function getDaysSinceRegistration(registrationDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const currentDate = new Date();
    const diffDays = Math.round(Math.abs((currentDate - registrationDate) / oneDay));
    return diffDays;
};
const daySinceSignUp = getDaysSinceRegistration(user.signUpStartDate)
     console.log(daySinceSignUp);
    if (daySinceSignUp <= 14){
        next()
    }else {
        return res.status(400).json({
           message: " Your trial period is over kindly subcribe for a plan " 
        })
    }
    // console.log(daySinceSignUp);
  }
  catch(error){
    res.status(500).json({
        error:error.massage
    })
}
}
       