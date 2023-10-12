import express from 'express';
import mongoose from 'mongoose';

const app = express();

const port = process.env.PORT || 9090;
const databaseName = "homeworkS4";

import userRoute from './routes/userRoute.js'
import gameRoute from './routes/gameRoute.js'

mongoose.set('debug', true);

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://0.0.0.0:27017/${databaseName}`)
    .then(() => {
        console.log(`connected to ${databaseName}`)
    })
    .catch(err => {
        console.log(err)
    })

app.use(express.json())

app.use('/user', userRoute)
app.use('/game', gameRoute)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});