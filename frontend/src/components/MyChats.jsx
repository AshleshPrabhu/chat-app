import { chatState } from '@/Context/ChatProvider'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Loader2, PlusIcon } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Cross2Icon } from '@radix-ui/react-icons'

//TODO:  fix the reload error , fix the background error when chat is selected
//TODO:  fix the error when group chat is created and chat[0] is not defined
function MyChats() {
    const [loadingChat, setLoadingChat] = useState(false)
    const [loggedUser, setLoggedUser] = useState(null)
    const {user,selectedChat,setSelectedChat,chats,setChats}=chatState()
    const [groupChat, setGroupChat] = useState(null)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
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
            setChats([data?.chats])
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
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(selectedUsers.length<2){
            toast.error("select at least two users")
        }else if(!groupChat){
            toast.error("please choose a name for your group chat")  
        }else{
            try {
                let a =selectedUsers?.map((u)=>u?._id)
                console.log(a)
                a=JSON.stringify(a)
                const response = await fetch('http://localhost:5000/api/v1/chat/group', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${user?.token||""}`
                    }, 
                    body:JSON.stringify({name:groupChat,users:a})
                });
                const data = await response.json();
                console.log("data",data)
                if (!data?.success) {
                    toast.error(data?.message||"failed to create the group chat")
                }else{
                    setChats([data?.groupChat])
                }
            } catch (error) {
                toast.error("error creating group chat")    
            }
        }

    }
    const handleUserClick=(user)=>{
        if(selectedUsers.includes(user)){
            toast.warning('user already added')
        }else{
            setSelectedUsers([...selectedUsers,user])
        }
    }

    const handleDelete=(user)=>{
        setSelectedUsers(selectedUsers.filter((item)=>item._id !== user._id))
    }

    const handleSearch=async(query) =>{
        setSearch(query)
        if(!query){
            setSearchResult([])
            return
        }
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:5000/api/v1/user?search=${query.trim()}`, {
                method: 'GET',
                headers: {
                    'Authorization':`Bearer ${user?.token||""}`
                    },
                });
                const data = await response.json();
                console.log("search",data)
                if (!data?.success) {
                    toast.error(data?.message||"failed to search the user")
                }else{
                    setSearchResult(data?.users)
                    setLoading(false)
                }
        } catch (error) {
            toast.error('failed to load the chats')
        }finally{
            setLoading(false)
        }
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
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button>New Group Chat <PlusIcon/></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>
                                <div className='w-full text-center text-3xl'>
                                    Create Group Chat
                                </div>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className='flex flex-col items-center justify-center'>
                                    <Input
                                    type="text"
                                    placeholder="Enter Group Name"
                                    className='w-full rounded-md mt-4'
                                    value={groupChat}
                                    onChange={(e) => setGroupChat(e.target.value)}
                                    />
                                    <Input
                                    type='text'
                                    placeholder='Add Users eg: John,Ashlesh'
                                    className='w-full rounded-md mt-3'
                                    onChange={(e)=>handleSearch(e.target.value)}
                                    />
                                </div>
                                <div className='flex items-center justify-between'>
                                    {
                                        selectedUsers?.map((u)=>(
                                                <div key={u?._id} className=' mt-2 flex items-center justify-center bg-orange-400 rounded-2xl p-1 gap-1'>
                                                    <div>
                                                        {u?.name||""}
                                                    </div>
                                                    <div className='flex items-center justify-center cursor-pointer' onClick={()=>handleDelete(u)} > 
                                                        <Cross2Icon/>
                                                    </div>
                                                </div>
                                        ))
                                    }
                                </div>

                                {loading?<div><Loader2/></div>:(
                                    <div className='flex flex-col items-center justify-around mb-2'>
                                        {searchResult?.slice(0,4)?.map((user)=>(
                                            <div key={user._id} className='bg-blue-200 rounded-md p-2 mt-3 cursor-pointer flex items-center justify-center w-full hover:bg-blue-400' onClick={()=>handleUserClick(user)}>
                                                <div className='w-[20%] flex items-center justify-center'>
                                                    <Avatar>
                                                        <AvatarImage src={user?.pic} alt="@shadcn" />
                                                        <AvatarFallback className='rounded-full bg-gray-300 p-3'>{user?.name[0]||""}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className='flex flex-col w-[80%]'>
                                                    <div>{user?.name||""}</div>
                                                    <div className='flex text-sm'><p className='font-semibold'>Email :  </p>  {user?.email||""}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>
                                <div onClick={handleSubmit}>Create Chat</div>
                            </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    
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