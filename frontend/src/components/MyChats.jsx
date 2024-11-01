import { chatState } from '@/Context/ChatProvider'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import { toast } from 'sonner'

function MyChats() {
    const [loadingChat, setLoadingChat] = useState(false)
    const [loggedUser, setLoggedUser] = useState(null)
    const {user,selectedChat,setSelectedChat,chats,setChats}=chatState()
    const fetchChat=async()=>{
        try {
        const response = await fetch('http://localhost:5000/api/v1/chat', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user?.token||""}`
            }, 
        });
        const data = await response.json();
        console.log("fetchchat",data)
        console.log("hi")
        if (!data?.success) {
            toast.error(data?.message||"failed to fetch the chat")
        }else{
            console.log("hello")
            console.log("cc",chats)
            if(!chats[0].find((c)=>c?._id===data?.chats?._id)){ 
                console.log("a")
                setChats([...chats,data?.chats])
            }
            console.log("c",chats)
            setSelectedChat(data?.chats)
            setLoadingChat(false)
        }


        } catch (error) {
        toast.error('error fetching the chat')
        setLoadingChat(false)
        }finally{
        setLoadingChat(false)
        }
    } 
    const getSender=(loggedUser,users)=>{
        return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
    }

    useEffect(()=>{
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
        fetchChat() 
    },[])
    return (
        <div className=' min-h-screen w-[30%] -mt-3'>
            <div className='w-full min-h-screen flex flex-col rounded-2xl bg-white  justify-center'>
                <div className='flex h-[10%] items-center justify-around mt-2'>
                    <div className='text-2xl'>My Chats</div>
                    <Button>New Group Chat <PlusIcon/></Button>
                </div>
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='w-[90%] mt-3 h-[90vh] bg-gray-100 rounded-lg'>
                        {
                            chats[0]?
                                (
                                    <div className='h-full w-full flex flex-col items-center justify-start'>
                                        {chats[0]?.map((chat) => (
                                            <div 
                                                key={chat?._id} 
                                                className={`${selectedChat ? "bg-blue-300" : "bg-slate-300"} rounded-lg flex flex-col w-full h-11 mt-3`}
                                            >
                                                <div className='w-full text-left text-lg'>{!chat?.isGroupChat?getSender(loggedUser,chat?.users):chat?.chatName}</div>
                                                <div></div>
                                                
                                            </div>
                                        ))}
                                    </div>
                                )
                                :(
                                    <div className='flex flex-col items-start gap-2'>
                                        <Skeleton className='h-10 w-[85%] mt-2'/>
                                        <Skeleton className='h-10 w-[85%] mt-2'/>
                                        <Skeleton className='h-10 w-[85%] mt-2'/>
                                        <Skeleton className='h-10 w-[85%] mt-2'/>
                                        <Skeleton className='h-10 w-[85%] mt-2'/>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
)
}

export default MyChats