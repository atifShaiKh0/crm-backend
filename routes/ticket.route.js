import express from "express";
import { createTicket, getAllTickets, updateTicket } from "../controllers/ticket.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateTicketBody, validateTicketStatus } from "../middlewares/validateTicketBody.js";

const router = express.Router();

router.post("/ticket", validateTicketBody, verifyToken, createTicket);

router.put("/ticket/:id", validateTicketStatus, updateTicket);

router.get("/ticket", verifyToken, getAllTickets)


export default router;