const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    companyName :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profilePicture:{
        type:String
    },
    isVerify:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel