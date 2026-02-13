import mongoose from "mongoose";
import { constants } from "../utils/constants.js";


const ticketSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    ticketPriority: {
        type: Number,
        required: true,
        default: 4
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        default: constants.ticketStatuses.open
    },

    reporter: {
        type: String,
        required: true,
    },

    assignee: {
        type: String
    }
    
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);