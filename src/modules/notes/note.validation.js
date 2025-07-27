import Joi from "joi";
import mongoose from "mongoose";

export const createNote=Joi.object({
    ownerId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid id")
    }).required(),
    title:Joi.string().required() ,
    content:Joi.string().required() ,
})

export const deleteNote=Joi.object({
    id:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid id")
    }).required(),
})