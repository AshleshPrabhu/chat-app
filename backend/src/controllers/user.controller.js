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

const registerUser  = async (req, res) => {
    try {
        const { name, password, email, pic } = req.body;
        
        // Trim whitespace and convert email to lowercase
        const trimmedEmail = email.trim().toLowerCase();

        if (!name || !password || !trimmedEmail) {
            throw new Error("Please enter all the fields");
        }

        // Check for existing user
        const existingUser  = await User.findOne({ email: trimmedEmail });
        // console.log(existingUser)
        if (existingUser) {
            throw new Error("User  already exists");
        }

        let picUrl = null;
        if (pic) {
            // Decode Base64 string
            const base64Data = pic.split(",")[1]; // Remove the metadata part
            const buffer = Buffer.from(base64Data, 'base64'); // Create buffer from Base64 data
            const fileName = `${name}-${Date.now()}`; // Create a unique file name
            picUrl = await uploadOnCloudinary(buffer, fileName); // Upload the picture
        }

        const pics = picUrl || null;

        // Create a new user
        const user = await User.create({
            name,
            password,
            email: trimmedEmail, // Use the normalized email
            pic: pics
        });

        if (user) {
            return res.status(201).json({
                message: "User  created successfully",
                user: {
                    _id: user?._id,
                    name: user?.name,
                    email: user?.email,
                    pic: user?.pic,
                    token: generateToken(user?._id)
                },
                success: true
            });
        }

    } catch (error) {
        console.log("registerUser Error : ", error);
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