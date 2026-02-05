import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/users",verifyToken, isAdmin, getUsers);


export default router;