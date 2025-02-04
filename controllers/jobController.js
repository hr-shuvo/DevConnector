import {nanoid} from 'nanoid';
import Job from '../models/JobModel.js';

let jobs = [
    {id: nanoid(), company: 'Google', position: 'Software Engineer', status: 'active'},
    {id: nanoid(), company: 'Facebook', position: 'Product Manager', status: 'active'},
    {id: nanoid(), company: 'Amazon', position: 'Data Scientist', status: 'active'}
];


export const getAllJobs = async (req, res) => {
    const jobs = await Job.find();

    res.status(200).json({jobs});
}

export const getJob = async (req, res) => {
    const {id} = req.params;

    const job = await Job.findById(id);

    if (!job) {
        return res.status(404).json({error: 'job not found'});
    }

    res.status(200).json({job});
}

export const createJob = async (req, res) => {
    const {company, position} = req.body;
    if (!company || !position) {
        return res.status(400).json({error: 'company and position are required'});
    }

    const job = await Job.create({company, position, 'status2': 'active'});

    res.status(201).json({job});
}


export const updateJob = async (req, res) => {
    const {id} = req.params;
    const {company, position} = req.body;

    if (!company || !position) {
        return res.status(400).json({error: 'company and position are required'});
    }

    const job = await Job.findByIdAndUpdate(id, req.body, {new: true});

    if (!job) {
        return res.status(404).json({error: 'job not found'});
    }

    res.status(200).json({message: 'job updated', job});
}

export const deleteJob = async (req, res) => {
    const {id} = req.params;

    const removeJob = await Job.findByIdAndDelete(id);

    if (!removeJob) {
        return res.status(404).json({error: 'job not found'});
    }

    res.status(200).json({message: 'job removed'});
}


