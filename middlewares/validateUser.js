import User from "../models/user.model.js";
import { constants } from "../utils/constants.js";


export const validateUser = async (req, res, next) => {

  if (!req.body.name) {
    return res.status(400).send({
      message: "Name is Required",
    });
  }

  if (!req.body.userId) {
    return res.status(400).send({
      message: "UserId is Required",
    });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      message: "User Already Exists",
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      message: "Password is required",
      status: true,
    });
  }

  const usersTypes = [
    constants.userType.customer,
    constants.userType.admin,
    constants.userType.engineer,
  ];

  if (req.body.userType && !req.body.userType.includes(usersTypes)) {
    return res.status(400).json({
      message: "User type is invalid",
    });
  }

  next();
};
