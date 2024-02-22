const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    companyName :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unquie:true
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
    },
    signUpStartDate:{
        type:Date,
        default:Date.now
    },
    blackList:{
        type:Array,
        default:String
       },
    isSubscribed:{
        type:Boolean,
        default:false
    },
    SubscriptionDate:{
        type:Date
    },
     SubscriptionPlan:{
        type:String,
    },
    trial: {
        type: Boolean,
        default: true
    },
},{timestamps:true})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel