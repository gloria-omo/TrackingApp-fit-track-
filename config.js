const mongoose = require("mongoose");

require("dotenv").config();


db = process.env.dbLink
mongoose.connect(db).then(()=>{
    console.log("database connected successfully")

}).catch((error)=>{
console.log(`unable to connect ${error.message}`)
})