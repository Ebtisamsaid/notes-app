export const notfound=(req,res,next)=>{
    return res.status(404).json({success:false,message:"appi is not found"});
}
