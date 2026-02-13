import User from "../models/user.model.js";
import Ticket from "../models/ticket.model.js";
import { constants } from "../utils/constants.js";

export const createTicket = async (req, res) => {
  const { title, ticketPriority, description, status } = req.body;

  const ticket = {
    title,
    ticketPriority,
    description,
    status,
    reporter: req.userId,
  };

  const engineer = await User.findOne({
    userType: constants.userType.engineer,
    userStatus: constants.userStatus.approved,
  });

  if (engineer) {
    ticket.assignee = engineer.userId;
  }

  try {
    const newTicket = await Ticket.create(ticket);

    if (newTicket) {
      return res.status(201).send(newTicket);
    }
  } catch (error) {
    console.log("Error while creating the ticket : ", error);
    return res.status(500).send({
      message: "Error : while creating the ticket",
    });
  }
};

export const updateTicket = async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.params.id });

  if (!ticket) return res.status(404).send({ message: "No ticket found" });

  const callingUserId = req.userId;

  const userDetails = await User.findOne(callingUserId);
  console.log("User name is ", userDetails.name);

  if (!userDetails) return res.status(404).send({ message: "User not found" });

  if (
    userDetails.userType == constants.userType.engineer ||
    userDetails.userType == constants.userType.admin
  ) {
    if (req.body.title !== undefined) {
      ticket.title = req.body.title;
    }

    if (req.body.description !== undefined) {
      ticket.description = req.body.description;
    }

    if (req.body.ticketPriority !== undefined) {
      ticket.ticketPriority = req.body.ticketPriority;
    }

    if (req.body.status !== undefined) {
      ticket.status = req.body.status;
    }

    if (req.body.assignee !== undefined) {
      ticket.assignee = req.body.assignee;
    }

    const updatedTicket = await ticket.save();

    return res.status(200).send(updatedTicket);
  } else {
    return res.status(400).send({
      message: "Ticket can only be updated by owner, engineer or admin",
    });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    let queryObj = {};

    const currUser = await User.findOne({
      _id : req.userId,
    });

    console.log("curr user is ", currUser);

    if (currUser.userType == constants.userType.customer) {
      queryObj.reporter = currUser._id;
    } else if (currUser.userType == constants.userType.engineer) {
      queryObj.assignee = currUser._id;
    } else if (currUser.userType == constants.userType.admin) {
      queryObj = {};
    }

    console.log("query object is ", queryObj)

    const tickets = await Ticket.find(queryObj);

    return res.status(200).send(tickets);
  } catch (err) {
    return res.status(400).send({
      message: "Error while getting all tickets",
    });
  }
};
