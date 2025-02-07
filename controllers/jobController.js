import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from "mongoose";
import day from "dayjs";


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


// Stats //////////

export const showStats = async (req, res) => {

    let stats = await Job.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {_id: '$jobStatus', count: {$sum: 1}}}
    ]);

    stats = stats.reduce((acc, curr) => {
        const {_id: title, count} = curr;
        acc[title] = count;
        return acc;

    }, {});

    console.log(stats);

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        rejected: stats.rejected || 0
    };

    let monthlyApplications = await Job.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {
            $group: {
                _id: {year: {$year: '$createdAt'}, month: {$month: '$createdAt'}},
                count: {$sum: 1}
            }
        },
        {$sort: {'_id.year': -1, '_id.month': -1}},
        {$limit: 6}

    ]);

    monthlyApplications = monthlyApplications.map((item) => {
        const {_id: {year, month}, count} = item;

        const date = day().month(month - 1).year(year).format('MMM YY');

        return {date, count};
    }).reverse();

    // let monthlyApplications = [
    //     {
    //         date: 'Feb 25',
    //         count: 23
    //     },
    //     {
    //         date: 'Jan 25',
    //         count: 37
    //     },
    //     {
    //         date: 'Dec 24',
    //         count: 32
    //     }
    // ]

    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})

};



