import express from 'express'
import todoRoutes from './routes/todoRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { connectDB } from './config/db.js'
import bodyParser from 'body-parser'
import { error } from './middleware/error.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()

connectDB();
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/v1', todoRoutes)

app.use('/v1', authRoutes)

app.use(error)



const port = 8000;

app.listen(port, () => {
    console.log(`server is in listening mode ${port}`)
});