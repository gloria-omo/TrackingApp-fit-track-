//  const {createUser,createUserBody} = require("./users");


const apiDocumentation = {
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
    ],
    apis:["../routers/*.js"]
    // tags: [
    //   {
    //     name: 'client',
    //   },
    //   {
    //     name: 'Users',
    //   },
    // ],
    // paths: {
    //     users: {
    //       post: createUser,
    //     },
    //   },
    //   components: {
    //     securitySchemes: {
    //       bearerAuth: {
    //         type: 'http',
    //         scheme: 'bearer',
    //         bearerFormat: 'JWT',
    //       },
    //     },
    //     schemas: {
    //       createUserBody,
    //     },
    //   },
    };
 
  
  module.exports={ apiDocumentation };