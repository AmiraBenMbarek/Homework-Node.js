import express from 'express';

const app = express();

const port = process.env.PORT || 9090;

import userRoute from './routes/userRoute.js'
import gameRoute from './routes/gameRoute.js'

app.use(express.json())

app.use('/user', userRoute)
app.use('/game', gameRoute)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});