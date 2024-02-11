const mongoose = require("mongoose");

require("dotenv").config();



db = "mongodb+srv://gloriaakubor7:4wfM8aI0cWSZ1S7f@cluster0.vbeda5a.mongodb.net/Fittness-app"

mongoose.connect(db)
.then(()=>{
    console.log("database connected successfully")

})
.catch((error)=>{
console.log(`unable to connect ${error.message}`)
}) 