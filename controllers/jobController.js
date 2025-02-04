import {nanoid} from 'nanoid';

let jobs = [
    {id: nanoid(), company: 'Google', position: 'Software Engineer', status: 'active'},
    {id: nanoid(), company: 'Facebook', position: 'Product Manager', status: 'active'},
    {id: nanoid(), company: 'Amazon', position: 'Data Scientist', status: 'active'},
    {id: nanoid(), company: 'Microsoft', position: 'Software Engineer', status: 'active'},
    {id: nanoid(), company: 'Apple', position: 'Product Manager', status: 'active'},
    {id: nanoid(), company: 'Netflix', position: 'Data Scientist', status: 'active'},
    {id: nanoid(), company: 'Twitter', position: 'Software Engineer', status: 'active'},
    {id: nanoid(), company: 'Shopify', position: 'Product Manager', status: 'active'},
    {id: nanoid(), company: 'Zoom', position: 'Data Scientist', status: 'active'},
    {id: nanoid(), company: 'Slack', position: 'Software Engineer', status: 'active'}
];


export const getAllJobs = async (req, res) => {
    res.status(200).json({jobs});
}

export const getJob = async (req, res) => {
    const {id} = req.params;

    const job = jobs.find(job => job.id === id);
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

    const id = nanoid(10);
    const job = {id, company, position, status: 'active'}
    jobs.push(job);
    res.status(201).json({job});
}


export const updateJob = async (req, res) => {
    const {id} = req.params;
    const {company, position} = req.body;

    if (!company || !position) {
        return res.status(400).json({error: 'company and position are required'});
    }

    const job = jobs.find(job => job.id === id);
    if (!job) {
        return res.status(404).json({error: 'job not found'});
    }

    job.company = company;
    job.position = position;

    res.status(200).json({job});
}

export const deleteJob = async (req, res) => {
    const {id} = req.params;

    const job = jobs.find(job => job.id === id);
    if (!job) {
        return res.status(404).json({error: 'job not found'});
    }

    jobs = jobs.filter(job => job.id !== id);
    res.status(200).json({job});
}


