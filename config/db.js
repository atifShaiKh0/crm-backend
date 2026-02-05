import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/crm");
        console.log("Mongodb Connected Successfully");
    } catch (error) {
        console.error("Mongodb Connection : " , error );
    }
}
