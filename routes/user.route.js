import express from "express";
import { getUsers, getUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import { validateStatusAndType } from "../middlewares/validateUser.js";

const router = express.Router();

router.get("/users", verifyToken, isAdmin, getUsers);
router.get("/users/:userId", validateStatusAndType, getUser);
router.patch("/users/:userId", verifyToken, isAdmin, validateStatusAndType, updateUser)

export default router;
