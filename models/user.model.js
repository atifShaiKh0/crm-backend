import mongoose from 'mongoose';
import { constants } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    userId : {
        type: String
    },
    password : {
        type : String,
        required : true,
        minLength: 7
    },
    email : {
        type : String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 10
    },
    userType: {
        type : String,
        enum : [
            constants.userType.customer,
            constants.userType.admin, 
            constants.userType.engineer
        ],
        required: true,
        default: "CUSTOMER",
    },
    userStatus: {
        type: String,
        enum: [
            constants.userStatus.pending,
            constants.userStatus.approved,
            constants.userStatus.blocked
        ],
        required: true,
        default: constants.userStatus.pending,
    }
}, { timestamps : true })


export default  mongoose.model("User", userSchema);