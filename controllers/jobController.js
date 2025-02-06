import Job from '../models/JobModel.js';
import {StatusCodes} from 'http-status-codes';
import {NotFoundError} from "../errors/customError.js";



export const getAllJobs = async (req, res) => {
    console.log(req.user)

    const jobs = await Job.find({createdBy: req.user.userId});

    res.status(StatusCodes.OK).json({jobs});
}

export const getJob = async (req, res) => {

    const job = await Job.findById(req.params.id);

    // if (!job) {
    //     throw new NotFoundError(`job with id ${id} not found`);
    // }

    res.status(StatusCodes.OK).json({job});
}

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({job});
}


export const updateJob = async (req, res) => {
    const {id} = req.params;

    const job = await Job.findByIdAndUpdate(id, req.body, {new: true});

    // if (!job) {
    //     throw new NotFoundError(`job with id ${id} not found`);
    // }

    res.status(StatusCodes.OK).json({msg: 'job updated', job});
}

export const deleteJob = async (req, res) => {
    const {id} = req.params;

    const removeJob = await Job.findByIdAndDelete(id);

    // if (!removeJob) {
    //     return res.status(StatusCodes.NOT_FOUND).json({error: 'job not found'});
    // }

    res.status(StatusCodes.OK).json({msg: 'job removed'});
}


