import { verifyToken } from "../utils/token/token.js"
import User from "../DB/models/user.model.js"

export const isAuthenticated= async(req,res,next)=>{
try {
    const{authorization}=req.headers
    if(!authorization){
        return next(new Error ("invalid format",{cause:400}))
    }
    if(!authorization.startsWith("Bearer")){
        next(new Error ("invalid token",{cause:400}))
    }
    
    
    const token =authorization.split(" ")[1]
 
    
    const decoded= verifyToken(token,process.env.JWT_SECRET)
  
    
    const user=await User.findById(decoded.payload.id)
    if(!user)return next(new Error("user is not found",{cause:404}))
        req.user=user
    if(user?.isDelete)return next(new Error ("user is deleted",{cause:400}))
        if(user?.changePasswordAt?.getTime()/1000 > decoded.iat) return next (new Error ("you must login again",{cause:400}))

    next()
} catch (error) {
    next(error)
    
}

}