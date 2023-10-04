import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import router from './routes/api';

const app = express()
const PORT = 8080

const {
    MONGODB_COMPASS_USERNAME,
    MONGODB_COMPASS_PASSWORD,
    MONGODB_COMPASS_DBNAME,
} = process.env

const dbUri = `mongodb://localhost:27017/ToDoApp`

const options = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(cors())
app.use(router)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World')
})

app.get('/about', (req: Request, res: Response) => {
    res.send('This is about route')
})

mongoose.set('useFindAndModify', true)
mongoose.connect(dbUri, options).then(() => {
    app.listen(PORT, () => {
        console.info(`App is listening at http://localhost:${PORT}`)
    })
}).catch((error) => {
    throw error  
})




