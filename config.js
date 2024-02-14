const mongoose = require("mongoose");

require("dotenv").config();



const db = process.env.dblink

mongoose.connect(db)
.then(()=>{
    console.log("database connected successfully")

})
.catch((error)=>{
console.log(`unable to connect ${error.message}`)
}) 