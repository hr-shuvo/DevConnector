import mongoose from "mongoose";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.js";


const JobSchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     required: [true, 'Please provide a title']
    // },
    company: {
        type: String,
        required: [true, 'Please provide a company']
    },
    position: {
        type: String
    },
    jobStatus: {
        type: String,
        enum: Object.values(JOB_STATUS),
        default: JOB_STATUS.PENDING
    },
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPE),
        default: JOB_TYPE.FULL_TIME
    },
    jobLocation: {
        type: String,
        default: 'my city'
    },
    // description: {
    //     type: String,
    //     required: [true, 'Please provide a description']
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // salary: {
    //     type: Number,
    //     required: [true, 'Please provide a salary']
    // },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }


}, {timestamps: true});


export default mongoose.model('Job', JobSchema);