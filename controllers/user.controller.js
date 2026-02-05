import userModel from "../models/user.model.js"
import { userResponse } from "../utils/objectConverter.js";

export const getUsers = async (req, res) => {
    const users = await userModel.find();

    return res.status(200).send(userResponse(users));
    
}