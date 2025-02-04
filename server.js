import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import {nanoid} from 'nanoid';

let jobs = [
    {id: nanoid(), company: 'Google', position: 'Software Engineer', status: 'active'},
    {id: nanoid(), company: 'Facebook', position: 'Product Manager', status: 'active'},
    {id: nanoid(), company: 'Amazon', position: 'Data Scientist', status: 'active'},
    {id: nanoid(), company: 'Microsoft', position: 'Software Engineer', status: 'active'},
    {id: nanoid(), company: 'Apple', position: 'Product Manager', status: 'active'},
    {id: nanoid(), company: 'Netflix', position: 'Data Scientist', status: 'active'},
    {id: nanoid(), company: 'Twitter', position: 'Software Engineer', status: 'active'},
    {id: nanoid(), company: 'LinkedIn', position: 'Product Manager', status: 'active'},
    {id: nanoid(), company: 'Uber', position: 'Data Scientist', status: 'active'},
    {id: nanoid(), company: 'Airbnb', position: 'Software Engineer', status: 'active'},
    {id: nanoid(), company: 'Stripe', position: 'Product Manager', status: 'active'},
    {id: nanoid(), company: 'Coinbase', position: 'Data Scientist', status: 'active'},
    {id: nanoid(), company: 'Robinhood', position: 'Software Engineer', status: 'active'},
    {id: nanoid(), company: 'Snapchat', position: 'Product Manager', status: 'active'},
    {id: nanoid(), company: 'TikTok', position: 'Data Scientist', status: 'active'},
    {id: nanoid(), company: 'Pinterest', position: 'Software Engineer', status: 'active'},
    {id: nanoid(), company: 'Shopify', position: 'Product Manager', status: 'active'},
    {id: nanoid(), company: 'Zoom', position: 'Data Scientist', status: 'active'},
    {id: nanoid(), company: 'Slack', position: 'Software Engineer', status: 'active'}
]

dotenv.config();
const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/', (req, res) => {
    res.json({ message: 'data received', data: req.body });
});

// Get all jobs
app.get('/api/v1/jobs', (req, res) => {
    res.status(200).json({jobs});
});

// Get a single job
app.get('/api/v1/jobs/:id', (req, res) => {
    const { id } = req.params;

    const job = jobs.find(job => job.id === id);
    if(!job) {
        return res.status(404).json({error: 'job not found'});
    }

    res.status(200).json({job});
});

// Create a job
app.post('/api/v1/jobs', (req, res) => {
    const { company, position } = req.body;
    if(!company || !position) {
        return res.status(400).json({error: 'company and position are required'});
    }

    const id = nanoid();
    const status = 'active';
    const job = {id, company, position, status}
    jobs.push(job);
    res.status(201).json({job});
});

// Update a job
app.put('/api/v1/jobs/:id', (req, res) => {
    const { id } = req.params;
    const { company, position } = req.body;

    if(!company || !position) {
        return res.status(400).json({error: 'company and position are required'});
    }

    const job = jobs.find(job => job.id === id);
    if(!job) {
        return res.status(404).json({error: 'job not found'});
    }

    job.company = company;
    job.position = position;

    res.status(200).json({job});
});

// Delete a job
app.delete('/api/v1/jobs/:id', (req, res) => {
    const { id } = req.params;

    const job = jobs.find(job => job.id === id);
    if(!job) {
        return res.status(404).json({error: 'job not found'});
    }

    jobs = jobs.filter(job => job.id !== id);
    res.status(200).json({message: 'job deleted'});
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});