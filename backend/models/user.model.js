import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:true,
        default:"https://avatar.iran.liara.run/public/17"
    }
},{timestamps:true})
export const User = mongoose.model("User",userSchema)