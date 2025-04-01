import mongoose from "mongoose";

const connectDB=async(DB_URL)=>{
    try{
        await mongoose.connect(DB_URL)
    }catch(err){
        console.log('Error in connecting database')
    }
}

export default connectDB;