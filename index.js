import express from 'express';
import 'dotenv/config'
import { connectDB } from './config/db.js';
import User from './models/user.model.js';
import bcrypt from "bcrypt";
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import ticketRoutes from "./routes/ticket.route.js";

// https://docs.google.com/document/u/0/d/1x866VrSsjchFf7dhD7U2zYLbzj-tt34STWuDMMyL6Uc/mobilebasic#heading=h.y3f6csbudndg

const app = express();

app.use(express.json());


connectDB();

app.get('/', (req, res) => {
    res.json({ mess: "hello atif" });
});


const admin = await User.findOne({ userId : "admin" });
    if(!admin){
        const admin = await User.create({
            name : "Aatif",
            password: await bcrypt.hash("123", 10),
            email: "atif@gmail.com",
            userType: "ADMIN",
            userStatus: "APPROVED",
        })

        console.log("Admin is Created NOW!!!", admin);
    }
    else {
        console.log("Admin user is already Present ");
    }


    app.use("/crm/api/v1", authRoutes);
    app.use("/crm/api/v1", userRoutes);
    app.use("/crm/api/v1", ticketRoutes);



app.listen(process.env.PORT, () => {
    console.log(`app is listening on port : ${process.env.PORT }`);
});