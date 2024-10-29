import mongoose from "mongoose";
const connectDB = async()=>{

        mongoose.connection.on('connected',()=>{
            console.log("Connection done");
        })
        await mongoose.connect(`${process.env.MOGODB_URI}/spotify`)

}

export default connectDB;