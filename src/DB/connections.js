import mongoose from "mongoose"

export const connectDB=async()=>{
    await mongoose.connect(process.env.DB_ONLINE).then(()=>{console.log("DB connect successfully");
    }).catch((error)=>{console.log("DB falied to connect" + " "+ error.message);
    })
}