const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({  
    planType :{
        type:String,
       default:null    
    },
    PlanStartDate:{
        type:String,
        required:true
    },
    
})