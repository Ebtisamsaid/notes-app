import { noteModel } from "../../DB/models/note.model.js"
import { generateSummary } from "../../utils/service/ai service.js"

export const summaryAi=async(req,res,next)=>{
    const {id}=req.params
    const note=await noteModel.findById(id)
    if(!note) return next(new Error("note is not exist",{cause:400}))
        const summary=await generateSummary(note.content)
   
    
    return res.status(200).json({success:true,summary})

}