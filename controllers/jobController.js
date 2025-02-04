import Job from '../models/JobModel.js';
import {StatusCodes} from 'http-status-codes';
import {NotFoundError} from "../errors/customError.js";



export const getAllJobs = async (req, res) => {
    const jobs = await Job.find();

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
    const {company, position, jobLocation, jobStatus, jobType} = req.body;
    if (!company || !position) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'company and position are required'});
    }

    const job = await Job.create({company, position, jobLocation, jobStatus, jobType});

    res.status(StatusCodes.CREATED).json({job});
}


export const updateJob = async (req, res) => {
    const {id} = req.params;

    const job = await Job.findByIdAndUpdate(id, req.body, {new: true});

    // if (!job) {
    //     throw new NotFoundError(`job with id ${id} not found`);
    // }

    res.status(StatusCodes.OK).json({message: 'job updated', job});
}

export const deleteJob = async (req, res) => {
    const {id} = req.params;

    const removeJob = await Job.findByIdAndDelete(id);

    // if (!removeJob) {
    //     return res.status(StatusCodes.NOT_FOUND).json({error: 'job not found'});
    // }

    res.status(StatusCodes.OK).json({message: 'job removed'});
}


