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
    password:{
        type:String,
        require:true
    },
    profilePicture:{
        type:String
    }
})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel