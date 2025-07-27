import { noteModel } from "../../DB/models/note.model.js"

export const createNote=async(req,res,next)=>{
    const{title,content,ownerId}=req.body
    
const note=await noteModel.create({ownerId,title,content})
return res.status(200).json({success:true,data:note,message:"note created successfully"})
}

export const deleteNote=async (req,res,next)=>{
    const{id}=req.params
    const note=await noteModel.findByIdAndDelete(id)
    if(!note)return next(new Error("not is not exist",{cause:400}))
        return res.status(200).json({success:true,message:"note deleted successfully"})
}