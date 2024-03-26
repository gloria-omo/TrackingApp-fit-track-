const createUser = {
    tags: ['Users'],
    description: 'Create a new use in the system',
    operationId: 'createUser',
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/createUserBody',
          },
        },
      },
      required: true,
    },
    responses: {
      '201': {
        description: 'User created successfully!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '60564fcb544047cdc3844818',
                },
                companyName: {
                  type: 'string',
                  example: 'John Snow',
                },
                phoneNumber: {
                  type: 'string',
                  example: '09123456789',
                },
                email: {
                  type: 'string',
                  example: 'john.snow@email.com',
                },
                password: {
                  type: 'string',
                  example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed',
                },
                isVerify: {
                  type: 'boolean',
                  example: false,
                },
                signUpStartDate: {
                  type: 'date',
                  example: '2021-03-20T19:40:59.495Z',
                },
                blackList: {
                    type: 'array',
                    example: [],
                  },
                  isSubscribed: {
                    type: 'boolean',
                    example: false,
                  },
                  SubscriptionDate: {
                    type: 'date',
                    example: '2021-03-20T19:40:59.495Z',
                  },
                  trial: {
                    type: 'boolean',
                    example: true,
                  },
                createdAt: {
                  type: 'string',
                  example: '2021-03-20T19:40:59.495Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2021-03-20T21:23:10.879Z',
                },
              },
            },
          },
        },
      },
      '500': {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal Server Error',
                },
              },
            },
          },
        },
      },
    },
  };
  const createUserBody = {
    type: 'object',
    properties: {
        // _id: {
        //   type: 'string',
        //   example: '60564fcb544047cdc3844818',
        // },
        companyName: {
          type: 'string',
          example: 'John Snow',
        },
        phoneNumber: {
          type: 'string',
          example: '09123456789',
        },
        email: {
          type: 'string',
          example: 'john.snow@email.com',
        },
        password: {
          type: 'string',
          example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed',
        },
        // isVerify: {
        //   type: 'boolean',
        //   example: false,
        // },
        // signUpStartDate: {
        //   type: 'date',
        //   example: '2021-03-20T19:40:59.495Z',
        // },
        // blackList: {
        //     type: 'array',
        //     example: [],
        //   },
        //   isSubscribed: {
        //     type: 'boolean',
        //     example: false,
        //   },
        //   SubscriptionDate: {
        //     type: 'date',
        //     example: '2021-03-20T19:40:59.495Z',
        //   },
        //   trial: {
        //     type: 'boolean',
        //     example: true,
        //   }
      },
  };
  
module.exports= { createUser, createUserBody };


/**
 * @swagger
 * /api/v1/getAll:
 *  get:
 *      summary: To get all users
 *      description: this api is use to fetch all user data from the database
 *      security:
 *        - BearerAuth: []
 *      responses:
 *          200:
 *              description: successful
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                             $ref: '#components/schema/user'
 * securitySchemes:
 *   BearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */