import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js';
import { notFound,errorHandler } from './middlewares/error.middleware.js';
import chatRouter from './routes/chat.routes.js';
const app = express();
app.use(cors({
    origin:'*',
    credentials:true,
}))
app.use(express.json({limit:"16kb"}))   
app.use(express.urlencoded({extended:true,limit:"16kb"})) 
app.use(express.static('public')); 



app.use('/api/v1/user',userRouter)
app.use('/api/v1/chat',chatRouter)
app.use(notFound)
app.use(errorHandler)

export {app}