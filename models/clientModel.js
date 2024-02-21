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
        type:String,
        enum:["1Month","2Month","3Month"]   
    },
    status:{
        type:Boolean,
        default:false
    },
    PlanStartDate:{
        type:Date,
        default:Date.now  
  },
    isActive:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


const clientModel = mongoose.model("clientModel",clientSchema);

module.exports = clientModel