const joi = require('joi')

const validation = async(req,res,next)=>{
    joi.object({
        companyName:joi.string().min(3).max(50),
        email:joi.string().email().required(),
        phoneNumber:joi.string().pattern(new RegExp('^[0-9]')).min(11).max(11),
        password:joi.string().min(6).max(20).pattern(new RegExp ('^[a-zA-Z0-9]{3,30}$')),
        confirmPassword:joi.string().pattern(new RegExp ('^[a-zA-Z0-9]{3,30}$'))
    })
    next()
}


module.exports = validation