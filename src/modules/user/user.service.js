import User from "../../DB/models/user.model.js";

export const uploadPic= async(req,res,next)=>{

        console.log( req);
        
        const user=await User.findByIdAndUpdate(req.user._id,{profilepic:req.file.path},{new:true})
        return res.status(200).json({success:true,result:user})
    }
