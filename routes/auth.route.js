import express from "express"
import { login, signup } from "../controllers/auth.controller.js";
import { validateUser } from "../middlewares/validateUser.js";



const router = express.Router();


router.post("/signup",validateUser, signup);

router.post("/login", login);


export default router;