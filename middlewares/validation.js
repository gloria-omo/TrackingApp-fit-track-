const joi = require('joi')

const validation = async(req,res,next)=>{
    joi.object({
        companyName:joi.string().min(3).max(50).pattern(new RegExp ('^[a-zA-Z]^')),
        email:joi.string().email().required(),
        phoneNumber:joi.string().pattern(new RegExp('^[0-9]')).min(11).max(11),
        password:joi.string().min(8).max(20).pattern(new RegExp ('^[a-zA-Z0-9]{3,30}$')),
        confirmPassword:joi.string().pattern(new RegExp ('^[a-zA-Z0-9]{3,30}$'))
    })
    next()
}


module.exports = validation



// const Joi = require("@hapi/joi");

// const validationMiddleware = (req, res, next) => {
//   // Define the validation schema using Joi
//   const schema = Joi.object({
//     fullName: Joi.string().min(3).required().pattern(new RegExp(/^[^\s].+[^\s]$/)).messages({
//       "any.required": "Fullname is required.",
//       "string.empty": "Fullname cannot be an empty string.",
//       "string.min": "Full name must be at least 3 characters long.",
//       "string.pattern.base": "Full name cannot start or end with a whitespace.",
//     }),
//     email: Joi.string().email().required().messages({
//       "any.required": "Email is required.",
//       "string.email": "Invalid email format.",
//     }),
//     phoneNumber: Joi.string()
//       .length(11)
//       .pattern(/^\d+$/)
//       .required()
//       .messages({
//         "any.required": "Phone number is required.",
//         "string.length": "Phone number must be exactly 11 digits.",
//         "string.pattern.base": "Phone number must contain only numeric digits.",
//       }),
//     password: Joi.string()
//       .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$"))
//       .required()
//       .messages({
//         "any.required": "Password is required.",
//         "string.pattern.base":
//           "Password must contain at least 8 characters, one capital letter, and one special character (!@#$%^&*).",
//       }),
//   });

//   // Validate the request body against the schema
//   const { error } = schema.validate(req.body, { abortEarly: false });

//   // If there's a validation error, return a response with the error details
//   if (error) {
//     const errorMessage = error.details.map((err) => err.message).join(" ");
//     return res.status(400).json({ error: errorMessage });
//   }

//   // If validation is successful, move to the next middleware
//   next();
// };


// const validationUpdate = (req, res, next) => {
//   // Define the validation schema using Joi
//   const schema = Joi.object({
//     fullName: Joi.string().min(3).pattern(new RegExp(/^[^\s].+[^\s]$/)).messages({
//       "string.empty": "Fullname cannot be an empty string.",
//       "string.min": "Fullname must be at least 3 characters long.",
//       "string.pattern.base": "Full name cannot start or end with a whitespace.",
//     }),
//     email: Joi.string().email().messages({
//       "string.email": "Invalid email format.",
//     }),
//     phoneNumber: Joi.string()
//       .length(11)
//       .pattern(/^\d+$/)
//       .messages({
//         "string.length": "Phone number must be exactly 11 digits.",
//         "string.pattern.base": "Phone number must contain only numeric digits.",
//       }),
//     password: Joi.string()
//       .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$"))
//       .messages({
//         "string.pattern.base":
//           "Password must contain at least 8 characters, one capital letter, and one special character (!@#$%^&*).",
//       }),
//   });

//   // Validate the request body against the schema
//   const { error } = schema.validate(req.body, { abortEarly: false });

//   // If there's a validation error, return a response with the error details
//   if (error) {
//     const errorMessage = error.details.map((err) => err.message).join(" ");
//     return res.status(400).json({ error: errorMessage });
//   }

//   // If validation is successful, move to the next middleware
//   next();
// };


// const validationPassword = (req, res, next) => {
//   // Define the validation schema using Joi
//   const schema = Joi.object({
   
//     newPassword: Joi.string()
//       .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$"))
//       .messages({
//         "string.pattern.base":
//           "New password must contain at least 8 characters, one capital letter, and one special character (!@#$%^&*).",
//       }),
//     existingPassword: Joi.string()
//       .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$"))
//       .messages({
//         "string.pattern.base":
//           "Existing password must contain at least 8 characters, one capital letter, and one special character (!@#$%^&*).",
//       }),
//   });

//   // Validate the request body against the schema
//   const { error } = schema.validate(req.body, { abortEarly: false });

//   // If there's a validation error, return a response with the error details
//   if (error) {
//     const errorMessage = error.details.map((err) => err.message).join(" ");
//     return res.status(400).json({ error: errorMessage });
//   }

//   // If validation is successful, move to the next middleware
//   next();
// };


// const validationCustomerAddress = (req, res, next) => {
//   // Define the validation schema using Joi
//   const schema = Joi.object({
//     customerAddress: Joi.string()
//       .required()
//       .trim()
//       .messages({
//         "string.base": "Customer address must be a string",
//         "string.empty": "Customer address must not be an empty string",
//         "any.required": "Customer address is required",
//       }),
//       cashBackToggle: Joi.boolean()
//   });
  

//   // Validate the request body against the schema
//   const { error } = schema.validate(req.body, { abortEarly: false });

//   // If there's a validation error, return a response with the error details
//   if (error) {
//     const errorMessage = error.details.map((err) => err.message).join(" ");
//     return res.status(400).json({ error: errorMessage });
//   }

//   // If validation is successful, move to the next middleware
//   next();
// };


// module.exports = { 
//   validationMiddleware,
//   validationUpdate,
//   validationPassword,
//   validationCustomerAddress
//   };