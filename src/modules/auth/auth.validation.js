import Joi from "joi";

export const registervalidation=Joi.object({
    userName:Joi.string().required(),
    phone:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    confirmPassword :Joi.string().valid(Joi.ref("password")).required(),
    }).required()
    export const confirmOtp=Joi.object({
        email:Joi.string().email().required(),
        otp:Joi.string().required()
    }).required()
    export const login=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }).required()

    export const logout=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }).required()
    export const forgetPassword=Joi.object({
        email:Joi.string().email().required(),
        
    }).required()
     export const resetPassword=Joi.object({
        email:Joi.string().email().required(),
        otp:Joi.string().required(),
        password:Joi.string().required(),
        repassword:Joi.string().valid(Joi.ref("password")).required()
        
    }).required()