export const GlobalErrorHandler=(error,req,res,next)=>{
    const statusCode=error.cause || 500
    return res.status(statusCode).json({success:false,message:error.message,stack:error.stack})
}