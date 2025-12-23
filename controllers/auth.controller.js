import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { constants } from "../utils/constants.js";


export const signup = async (req, res) => {

    try { 

        let userStatus = req.body.userStatus;

        if(!req.body.userType || req.body.userType == constants.userType.customer) userStatus = "APPROVED";

        else userStatus = "PENDING";


        const userObj = {
            name: req.body.name,
            password: await bcrypt.hash(req.body.password, 10),
            userId: req.body.userId,
            email: req.body.email,
            userType: req.body.userType,
            userStatus: userStatus,
        }

        const user = await User.create(userObj);
        console.log(user);
        res.status(201).send(user);
    }

    catch(error){
        console.error("Error Signup : ", error);
    }
}

export const login = async (req, res) => {
    return res.json({ success: "true" });
}