import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js';
import { notFound,errorHandler } from './middlewares/error.middleware.js';
const app = express();
app.use(cors({
    origin:'*',
    credentials:true,
}))
app.use(express.json({limit:"16kb"}))   
app.use(express.urlencoded({extended:true,limit:"16kb"})) 
app.use(express.static('public')); 



app.use('/api/v1/user',userRouter)

app.use(notFound)
app.use(errorHandler)

export {app}