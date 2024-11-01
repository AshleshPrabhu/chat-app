import mongoose from "mongoose";

const messageSchema=mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
},{timestamps:true})
export const Message = mongoose.model("Message",messageSchema)