import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import jobRouter from "./routes/jobRouter.js";


dotenv.config();
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routers
app.use('/api/v1/jobs', jobRouter);



app.use('*', (req, res) => {
    res.status(404).json({error: 'route not found'});
});

app.use((err, req, res, next) => {
    console.log(err);
    if (process.env.NODE_ENV === 'development') {
        res.status(500).json({error: err.message})
    } else {
        res.status(500).json({error: 'something went wrong'});
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});