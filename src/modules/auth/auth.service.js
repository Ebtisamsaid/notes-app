import { otpModel } from "../../DB/models/model.otp.js"
import User from "../../DB/models/user.model.js"
import { providers } from "../../utils/endpoints/endpoit.js"
import { compare, hash } from "../../utils/hash/hash.js"
import { generatehtml } from "../../utils/sendEmails/htmltemplate.js"
import { sendEmails, subject } from "../../utils/sendEmails/sendEmails.js"
import Randomstring  from "randomstring"
import { generateToken } from "../../utils/token/token.js"


// signup and send otp
export const register= async(req,res,next)=>{
    const{email,userName,phone,password}=req.body
    const emailexist=await User.findOne({email})
    if(emailexist)return next(new Error("email is already register",{cause:404}))
        const genrateOtp=Randomstring.generate({length:4,charset:'alphanumeric'})
    sendEmails({to:email,html:generatehtml(genrateOtp),subject:subject.register})
        const user=   await User.create({...req.body ,provider:providers.system})


    if(!user)return next(new Error("user not created ",{cause:400}))
        const otp=await otpModel.create({email,otp:genrateOtp,type:" register OTP"})
    return res.status(200).json({
success:true,message:"user created successfully",user})

}

// confirm otp
export const confirmOtp=async(req,res,next)=>{
    const{email,otp}=req.body


    const user=await User.findOne({email:req.body.email})   
    
    
    if(!user){
        next(new Error("user is not register",{cause:404}))
    }
    const userOtp=await otpModel.findOne({email})
    if(!userOtp) return next(new Error("this email not have otp",{cause:400}))
        if(otp !== userOtp.otp){
            return next(new Error("otp is not correct",{cause:400}))
        }
        res.status(200).json({success:true,message:"confirmed otp"})
        user.isConfirmed=true
        await user.save()

}

export const login= async(req,res,next)=>{
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        return next(new Error("email is not  found"))
    }
   
    
    if(!compare({plaintetxt:password,hash:user.password})){
        next(new Error("password not match",{cause:400}))
    }
    const access_token=generateToken({payload:{email:user.email,id:user._id}},process.env.JWT_SECRET,"1h")
    const refresh_token=generateToken({payload:{email:user.email,id:user._id}},process.env.JWT_SECRET,"10h")
    return res.status(200).json({success:true,access_token,refresh_token})

}
export const logout=(req,res,next)=>{
    return res.status(200).json({message:"logout successfully"})

}

export const forgetPassword=async(req,res,next)=>{
    const{email}=req.body
    const user=await User.findOne({email})
    if(!user){return next(new Error("user is not exist",{cause:404}))}
    const otp=Randomstring.generate({length:4,charset:"alphanumeric"})
    sendEmails({to:user.email,html:generatehtml(otp),subject:subject.resetPass})
    const saveOtp=await otpModel.create({otp,type:"forget password",email:user.email})
return res.status(200).json({success:true,message:"otp send successfully"})
}


export const resetPassword=async(req,res,next)=>{
    const{otp,password,repassword,email}=req.body
    const getOtp=await otpModel.findOne({email,type:"forget password"})
    if(otp != getOtp.otp){
        return next(new Error("otp is not match",{cause:400}))
    }
    const user =await User.findOneAndUpdate({email},{password:hash({plaintetxt:password,Rounds:8})},{new:true})
    if(!user)return new Error("user is not fiund",{cause:400})

        return res.status(200).json({success:true,message:"password reset successfully"})

}