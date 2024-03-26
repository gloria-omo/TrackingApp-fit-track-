const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc =require("swagger-jsdoc")
// const { apiDocumentation } = require('./docs/apidoc') 
const express = require("express");
require("./config");
const router = require("./routers/userRouter");
const clientRouter = require("./routers/clientRouter")
const multer = require("./helpers/multer");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const { schedule } = require("node-cron"); 
// const swaggerJSDoc = require('swagger-jsdoc');



const app = express();
app.use(cors({origin:"*"}))
app.use(express.json());

app.use(session({
    secret: process.env.sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
  }));

app.use("/uploads",express.static("uploads"));

/**
 * @swagger
 * /api/v1:
 *  get:
 *      summary: hdggdjfhnfjjffjjfh
 *      description: jfhfhjkghghhfhfhh
 *      responses:
 *          200:
 *              description: hdhdhfhhfhr
 * 
 */
app.get("/api/v1",(req,res)=>{
     res.send("welcome to version 1 of this application")
});

app.use("/api/v1",router);
app.use(clientRouter); 

// app.use('/documentation', swaggerUi.serve,
//  swaggerUi.setup(apiDocumentation));

const options = {
  definition: {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'My REST API - Documentation',
    description: 'this API here is for my planpulse app',
  //   termsOfService: 'https://mysite.com/terms',
    contact: {
      name: 'gloria name',
      email: 'gloriaakubor7@gmail.com',
      // url: 'https://devwebsite.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:4040/',
      description: 'Local Server',
    },
    {
      url: 'https://planpulse.onrender.com',
      description: 'Production Server',
    },
  ]
},
  apis:["./routers/*.js"]}
const specs = swaggerJSDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs,{explorer:true})
);

port = process.env.port;
app.listen(port,()=>{
    console.log(`server is listening to port: ${port}`)
});


process.on('SIGINT',async()=>{
  await schedule.stop()
  await schedule.close()
  console.log("cron-job close")
  process.exit(0)
})