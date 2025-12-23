import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27027/crm");
        console.log("Mongodb Connected Successfully");
    } catch (error) {
        console.error("Mongodb Connection : " , error );
    }
}
