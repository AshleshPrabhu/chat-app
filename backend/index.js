import express from 'express'
import dotenv  from 'dotenv';
import { app } from '../backend/src/app.js';
dotenv.config({
    path: './.env',
});
app.on(
    'error',
    (err) => {
        console.error('Error:', err);
        }
)
app.listen(process.env.PORT||8000,()=>{
    console.log(`server is running at port ${process.env.PORT}`)
});

 