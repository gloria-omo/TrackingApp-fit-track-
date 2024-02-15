const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"userModel"
    },
    fullName:{
        type:String,
        required:true
    },
    plan:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"planModel"
    },
    isActive:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


const clientModel = mongoose.model("clientModel",clientSchema);

module.exports = clientModel