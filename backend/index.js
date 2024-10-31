import express from 'express'
import dotenv  from 'dotenv';
import { app } from '../backend/src/app.js';
import connectDB from "../backend/src/db/index.js";
dotenv.config({
    path: './.env',
});
connectDB()
.then(()=>{
    app.on(
        'error',
        (err) => {
            console.error('Error:', err);
            }
    )
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port ${process.env.PORT}`)
    });
})
.catch((err) => {
    console.log("MONGODB connection failed",err);
})

 