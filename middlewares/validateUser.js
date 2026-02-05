import User from "../models/user.model.js";
import { constants } from "../utils/constants.js";


export const validateUser = async (req, res, next) => {

  if (!req.body.name) {
    return res.status(400).send({
      message: "Name is Required",
    });
  }


  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      message: "User with this email already exists.",
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

  if (req.body.userType && !usersTypes.includes(req.body.userType)) {
    return res.status(400).json({
      message: "User type is invalid",
    });
  }

  next();
};
