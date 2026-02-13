import { constants } from "../utils/constants.js";


export const validateTicketBody = async (req, res, next) => {

    if(!req.body.title){
        return res.status(400).send({
            message: "Title is required"
        })
    }

    if(!req.body.ticketPriority){
        return res.status(400).send({
            message : "Ticket Priority is required"
        })
    }

    if(!req.body.description){
        return res.status(400).send({
            message: "Description is required"
        })
    }

    next();
}

export const validateTicketStatus = (req, res, next) => {

    const statusReq = req.body.status;
    const statuses = constants.ticketStatuses;

    const allowedStatus = [
        statuses.open,
        statuses.closed,
        statuses.blocked
    ]

    if(statusReq && !allowedStatus.includes(statusReq)){
        return res.status(400).send({
            message: "Ticket Status is not valid"
        })
    }

    next();


}