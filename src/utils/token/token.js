import jwt from "jsonwebtoken"

export const generateToken=({payload},signature=process.env.JWT_SECRET,expiresIn="1h")=>{
    return jwt.sign({payload},signature,{expiresIn})
}
export const verifyToken=(generateToken,signature=process.env.JWT_SECRET)=>{
    return jwt.verify(generateToken,signature)
}