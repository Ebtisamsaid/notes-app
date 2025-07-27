
import { model, Schema, Types } from "mongoose";

const noteSchema=new Schema({
    ownerId:{type:Types.ObjectId,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true}
},{timestamps:true})

export const noteModel=model("note",noteSchema)
