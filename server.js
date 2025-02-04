import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import jobRouter from "./routes/jobRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";


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

app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 5000;
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (e) {
    console.error(e);
    process.exit(1);
}

