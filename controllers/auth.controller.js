import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { constants } from "../utils/constants.js";
import jwt from "jsonwebtoken"


export const signup = async (req, res) => {

    try { 

        let userStatus = req.body.userStatus;

        if(!req.body.userType || req.body.userType == constants.userType.customer) userStatus = "APPROVED";

        else userStatus = "PENDING";


        const userObj = {
            name: req.body.name,
            password: await bcrypt.hash(req.body.password, 10),
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
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(404).send({ message: "No account is associated with this userID" });


    if(user.userStatus != constants.userStatus.approved) return res.status(400).send({ message: "Status is not approved" });
    
    const password = bcrypt.compareSync(req.body.password, user.password);

    if(!password) return res.status(401).send({ message: "Invalid Password" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "2h" });


    return res.status(200)
            .send({
                user: user.email,
                token : token
            })
}