
import express from "express"
import { connectDB } from "./src/DB/connections.js"
import { notfound } from "./src/utils/errorhandler/notfound.js"
import { GlobalErrorHandler } from "./src/utils/errorhandler/globalerrorhandler.js"
import { config } from "dotenv"
import  authRouter from "./src/modules/auth/auth.controller.js"
import userRouter from "./src/modules/user/user.controller.js"
import noteRouter from "./src/modules/notes/notes.controller.js"
import summaryRouter from "./src/modules/AI aummary/summary.controller.js"
import cors from "cors"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
const limiter=rateLimit({
  windowMs:15*60*1000,
  max:10,
  message:"too many request plese try again after 15 min"
})
export const Bootstrap= async(app)=>{
config()
    // parse
    app.use(helmet())
    app.use(express.json())
    app.use(cors())
    app.use('/uploads', express.static('uploads'));

    // connectDB
  await  connectDB()
    // Routes
app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/note",noteRouter)
app.use("/notes",summaryRouter)
    
   app.use(GlobalErrorHandler)
   app.all('/*path',notfound)





    

}