import { roles } from "../utils/endpoints/endpoit.js"

export const isAuthorized=(role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            next(new Error("you are not allwed",{cause:400}))
        }
        next()

    }

}