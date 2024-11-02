import Chat  from "../models/chat.model.js"
import User from "../models/user.model.js"

const accessChat=async(req,res)=>{
    try {
        const {userId}=req.body
        if(!userId){
            return res.status(404).json({message:"user id is not found"})
        }
        var chat = await Chat.find({
            isGroupChat: false,
            users: { $all: [req.user._id, userId] }
        }).populate("users","-password").populate({
            path:'latestMessage',
            model:'Message',
            populate:{
                path:'sender',
                model:'User',
                select:"name email pic"
            }
        })
        if(chat.length>0){
            return res.status(200).json(chat[0])
        }else{
            var chatData={
                chatName:"sender",
                isGroupChat:false,
                users:[req.user._id,userId],
            }
            try {
                const createdChat = await Chat.create(chatData)
                if(!createdChat){
                    return res.status(400).json({message:"failed to create chat",success:false})
                }
                const finalChat = await Chat.findOne({_id:createdChat._id}).populate(
                    "users","-password"
                )
                return res.status(201).json({
                    chat:finalChat,
                    message:"chat created successfully",
                    success:false
                })
            } catch (error) {
                console.log("failed to create chat",error)
                return res.status(400).json({message:"failed to create chat ",success:false})
            }
        }

    } catch (error) {
        console.log("access chat error:",error)
        return res.json({
            status: false,
            message: "Error accessing chat"
        })

    }
}

const fetchChats = async(req,res)=>{
    try {
        const userChats = await Chat.find({
            users:{$in:[req.user._id]}
        }).populate("users","-password")
        .populate("groupAdmin","-passwords")
        .populate({
            path:"latestMessage",
            model:"User",
            populate:{
                path:'sender',
                model:'User',
                select:"name email pic"
            }
        })
        .sort({updatedAt:-1})
        if(userChats.length>0){
            return res.status(200).json({chats:userChats,success:true})
        }else{
            return res.status(200).json({chats:[],success:true})
        }
    } catch (error) {
        console.log("fetch chats for a user error",error)
        return res.json({
            message:"failed to fetch chats",
            success:false
        })
    }
}

const createGroupChat=async(req,res)=>{
    try {
        const {name,users}=req.body
        if(!name||!users){
            return res.status(404).json({
                success:false,
                message:"name and users are required"
            })
        }
        var Users = JSON.parse(users)
        if(Users.length<2){
            return res.status(404).json({
                success:false,
                message:"atleast 2 users are required"
            }) 
        }
        Users.push(req.user._id.toString())
        const group = await Chat.create({
            chatName:name,
            users:Users,
            isGroupChat:true,
            groupAdmin:req.user._id
        }) 
        
        if(!group){
            return res.status(404).json({
                success:false,
                message:"failed to create group"
                })
        }
        const groupChat= await Chat.findOne({_id:group._id}).populate("users","-password").populate("groupAdmin","-password")
        if(!groupChat){
            return res.status(404).json({
                success:false,
                message:"failed to fetch group"
            })
        }
        return res.status(201).json({
            message:"group chat created successfully",
            success:true,
            groupChat
        })
        
    } catch (error) {
        console.log("create group chat error",error)
        return res.json({
            status:false,
            message:"Error creating group chat"
        })
    }
}

const renameGroupChat=async(req,res)=>{
    try {
        const { chatId,chatName}=req.body
        const updatedChat= await Chat.findByIdAndUpdate(
            chatId,
            {
                $set:{chatName:chatName}
            },
            {
                new:true
            }
        ).populate("users","-password").populate("groupAdmin","-password")
        if(!updatedChat){
            return res.status(404).json({
                success:false,
                message:"failed to update group chat name"
            })
        }
        return res.status(200).json({
            success:true,
            message:"group chat name updated successfully",
            updatedChat
        })


    } catch (error) {
        console.log("rename group chat error",error)
        return res.status(500).json({
            status:false,
            message:"Error renaming group chat"
        })
    }
}

const addToGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User  not found"
            });
        }

        // Check if the chat exists
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        // Check if user is already in the chat
        if (chat.users.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "User  is already in the chat"
            });
        }

        // Proceed to add the user to the chat
        chat.users.push(userId);
        const updatedChat = await chat.save();
        const populatedChat = await Chat.findById(updatedChat._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        return res.status(200).json({
            success: true,
            message: "User  added to group chat successfully",
            chat: populatedChat
        });

    } catch (error) {
        console.log("add to group error", error);
        return res.status(500).json({
            success: false,
            message: "Error adding user to group"
        });
    }
};
const removeFromGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User  not found"
            });
        }

        // Check if the chat exists
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        // Check if user is not in the chat
        if (!chat.users.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "User  is not in the chat"
            });
        }

        // Remove the user from the chat
        chat.users = chat.users.filter(id => id.toString() !== userId.toString());

        // Save the updated chat
        const updatedChat = await chat.save();
        const populatedChat = await Chat.findById(updatedChat._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password");


        return res.status(200).json({
            success: true,
            message: "User  removed from group chat successfully",
            chat: populatedChat
        });

    } catch (error) {
        console.log("remove from group error", error);
        return res.status(500).json({
            success: false,
            message: "Error removing user from group"
        });
    }
};

export {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    addToGroup,
    removeFromGroup
}