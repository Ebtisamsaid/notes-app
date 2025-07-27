import mongoose, { Schema } from "mongoose";

const otpSchema=new Schema({
    email:{type:String,required:true},
    type:{type:String,required:true},
    otp:{type:String,default:null,required:true ,expireAfterSeconds:500},
},{timestamps:true})
export const otpModel=mongoose.model("otp",otpSchema)