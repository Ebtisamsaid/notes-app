

import mongoose, { Schema } from "mongoose";
import { ciphertext, decrypt } from "../../../src/utils/encryption/encrypt.js";
import { hash } from "../../utils/hash/hash.js";
import {  gender, providers, roles } from "../../utils/endpoints/endpoit.js";
const userSchema = new Schema({
    userName :String,
   
    phone :{type:String,required:true},
    email:{type:String,unique:[true,"email is already exist"],required:true ,lowerCase:true,match:/^[\w-\.]+@(\w){3,10}\.\w{2,5}$/},
    isConfirmed :{type:Boolean,default:false},
    isDelete:{type:Boolean,default:false},
    role:{type:String,enum:Object.values(roles),default:roles.user},
    gender:{type:String,enum:Object.values(gender),default:gender.male},
    profilepic:{type:String,default:null},
    password:{type:String,required:function(){
        return this.providers ==providers.system ? true:false
    }},
    providers:{type:String,enum:Object.values(providers)},
    TempEmail:{type:String,default:null},
    changePasswordAt:Date,
    deletedAt :Date,
    updatedBy:{type: mongoose.Schema.Types.ObjectId,ref:"user"},
    changePasswordAt:{type:Date,default:null}


 
  
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})



userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await hash({plaintetxt:this.password})
    }
    if(this.isModified("phone")){
        this.phone= await ciphertext({encryptText:this.phone})
    }
    next()
})
userSchema.post("find",async function(docs){
    await Promise.all(
        docs.map(  async(doc)=>{
            if(doc.phone){
                doc.phone=await decrypt({ciphertext:this.phone})
            }
        })
    )
    
})


// userSchema.virtual("fullName").get(function(){
//     return `${this.firstName}`+" " `${this.lastName}`
// })

// model 
const User=mongoose.model("user",userSchema)
export default User