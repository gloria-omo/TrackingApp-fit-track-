const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    name:{
        type:String,
        required:true
    },
    plan:{
        type:String

    },
    isActive:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


const clientModel = mongoose.model("clientModel",clientSchema);

module.exports = clientModel