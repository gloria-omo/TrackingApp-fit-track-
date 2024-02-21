const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({  
    planType :{
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
    
})

const planModel = mongoose.model("plan",planSchema)

module.exports =  planModel