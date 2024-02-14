const express = require("express");
require("./config");
const router = require("./routers/userRouter");
const multer = require("./helpers/multer");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");



const app = express();
app.use(cors({origin:"*"}))
app.use(express.json());

app.use(session({
    secret: process.env.sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
  }));

app.use("/uploads",express.static("uploads"))

app.get("/api/v1",(req,res)=>{
     res.send("welcome to version 1 of this application")
});

app.use("/api/v1",router);

port = process.env.port;
app.listen(port,()=>{
    console.log(`server is listening to port: ${port}`)
});