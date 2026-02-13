import userModel from "../models/user.model.js";
import { constants } from "../utils/constants.js";
import { userResponse } from "../utils/objectConverter.js";

export const getUsers = async (req, res) => {
  try {
    const { status, type } = req.query;


    let filter = {};
    if(status) filter.userStatus = status;
    if(type)   filter.userType = type;
    

    const users = await userModel.find(filter);

    return res.status(200).send(userResponse(users));
  } catch (err) {
    console.log("Getting Users : ", err);
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).send({
        message: "User not found with this ID",
      });
    }

    return res.status(200).send(userResponse(user));
  } catch (err) {
    console.log("While getUser : ", err);
  }
};


export const updateUser = async (req, res) => {

  try{
    const { id } = req.params;

  const { name, userStatus, userType } = req.body;

  const updates = {};

  if(name) updates.name = name;
  if(userStatus) updates.userStatus = userStatus;
  if(userType) updates.userType = userType;


  if(Object.keys(updates).length == 0){
    return res.status(400).send({
      message: "Nothing to update"
    })
  }


  const user = await userModel.findOneAndUpdate(
    { _id : id },
    updates,
    { new : true }
  )

  if(!user) {
    return res.status(404).send({
      message: "User not Found"
    })
  }

  return res.status(200).send(userResponse(user));
  }  

  catch(err){
    res.status(500).send({ message: "While Updating user" });
  }
}