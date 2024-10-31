import {User} from '../models/user.model.js'
import generateToken from '../utils/generateToken.js'

const loginUser =async(req,res)=>{
    try {
        const { password,email} = req.body
        if(!password||!email){
            throw new Error("Please enter all the fields")
        }
        const user = await User.findOne({email})
        if(!user){
            throw new Error("user doesnt exist with given email")
        }
        const isCorrect=user.isPasswordCorrect(password)
        if(!isCorrect){
            throw new Error("The given password is incorrect")
        }
        if(user&&isCorrect){
            return res
            .status(201)
            .json({
                message:'user logged in successfully',
                user:{
                    _id:user?._id,
                    name:user?._name,
                    email:user?._email,
                    token:generateToken(user?._id)
                },
                success:true
            })
        }

    } catch (error) {
        console.log("registerUserError : ",error)
        return res.status(400).json({
            message: error?.message,
            success: false
            });
    }
}

const registerUser=async(req,res)=>{
    try {
        const { name,password,email,pic} = req.body
        if(!name||!password||!email){
            throw new Error("Please enter all the fields")
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            throw new Error("User already exists")
        }
        const user = await User.create({
            name,
            password,
            email,
            pic
        })
        if(user){
            return res.status(201).json({
                message: "User created successfully",
                user:{
                    _id:user?._id,
                    name:user?.name,
                    email:user?.email,
                    pic:user?.pic,
                    token:generateToken(user?._id)

                },
                success: true
            });
        }

    } catch (error) {
        console.log("registerUserError : ",error)
        return res.status(400).json({
            message: error?.message,
            success: false
            });
    }
}

export {
    loginUser,
    registerUser
}