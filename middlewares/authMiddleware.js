import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { constants } from "../utils/constants.js";


export const verifyToken = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }


        const token = authHeader.split(" ")[1];
        
        if(!token) {
            return res.status(403).send({
                message: "No Access Token Passed !"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);

        const user = await userModel.findById(decoded.id);

        if(!user) return res.status(404).send({ message: "User Not Found" });

        req.userId = decoded.id;
        // req.user = user;

        next();
    }
    catch(error) {
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
}


export const isAdmin = async (req, res, next) => {

    const user = await userModel.findById( req.userId );

    if(!user) return res.status(401).send({ message : "User not found in authorization" });

    if(user.userType == constants.userType.admin) next();

    else res.status(403).send({
        message : "only Admin role is allowed to access this API"
    })


}