import mongoose from "mongoose";


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
        enum: ['applied', 'interview', 'offer', 'rejected', 'pending'],
        default: 'pending'
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
        default: 'full-time'
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


}, {timestamps: true});


export default mongoose.model('Job', JobSchema);