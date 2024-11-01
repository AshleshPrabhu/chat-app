import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bell, BellDotIcon, Loader2, Search } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Skeleton } from "@/components/ui/skeleton"

import { chatState } from '@/Context/ChatProvider'
import { useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { toast } from 'sonner'

function SideBar() {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const {user,selectedChat,setSelectedChat,chats,setChats}=chatState()
  const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('userInfo')
    navigate('/')
  }
  const accessChat=async(userId)=>{
    try {
      setLoadingChat(true)
      const response = await fetch('http://localhost:5000/api/v1/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${user?.token||""}`
        },
        body: JSON.stringify({userId}), 
      });
      const data = await response.json();
      console.log("accesschat",data)
      if (!data?.success) {
        toast.error(data?.message||"failed to create the chat")
      }else{
        setSelectedChat(data?.chat)
        setLoadingChat(false)
      }


    } catch (error) {
      toast.error('error creating the chat')
      setLoadingChat(false)
    }finally{
      setLoadingChat(false)
    }
  }
  const handleSearch =async()=>{
    if(!search){
      toast.error('username cant be empty')
    }else{
      try {
        setLoading(true)
        const finalSearch=search.trim()
        const response = await fetch(`http://localhost:5000/api/v1/user?search=${finalSearch}`, {
          method: 'GET',
          headers: {
              'Authorization':`Bearer ${user?.token||""}`
          },
        });
        // console.log(response)  
        
        const data = await response.json(); 
        // console.log("data",data)
        if(!data.success){
          toast.error('no users found')
        }else{
          setSearchResult(data.users)
        }
        
        setLoading(false)
      } catch (error) {
        toast.error('failed to find the users')
        setLoading(false)
      }finally{
        setLoading(false)
      }

    }
  }
  return (
    <div className='bg-white rounded-md h-12 flex items-center justify-between'>
      <div className='ml-4'>
        {/* <Button className='bg-gray-400'>
          <Search/> Search user
        </Button> */}
        <Drawer position="left">
          <DrawerTrigger asChild>
            <Button className='bg-gray-400'>
                <Search/> Search user
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-72 min-h-screen ">
            <div className='w-full h-full flex flex-col'>
              <DrawerTitle>
              <div className='text-center text-2xl font-bold'>
                Search Users
              </div>
              </DrawerTitle>
              <div className='w-full flex mt-5'>
                <Input
                  placeholder="enter user's name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {loading?
                  <span><Loader2/></span>
                    :
                  <Button onClick={handleSearch}>
                    Go
                  </Button>
                }
              </div>
              <div className='w-full h-full mt-4'>
                {
                  loading?
                  <div className='flex flex-col items-start gap-2'>
                    <Skeleton className='h-10 w-[85%] mt-2'/>
                    <Skeleton className='h-10 w-[85%] mt-2'/>
                    <Skeleton className='h-10 w-[85%] mt-2'/>
                    <Skeleton className='h-10 w-[85%] mt-2'/>
                    <Skeleton className='h-10 w-[85%] mt-2'/>
                  </div>
                  :
                  <div className='h-full w-full flex flex-col items-center justify-center'>
                    {
                      searchResult?.map((user)=>(
                        <div 
                          key={user._id} 
                          className='w-full flex gap-1 mt-3 bg-gray-200 rounded-xl p-2 cursor-pointer hover:bg-blue-400'
                          onClick={()=>accessChat(user._id)}
                        >
                          <div>
                            <Avatar >
                              <AvatarImage src={user?.pic} alt="@shadcn" />
                              <AvatarFallback>{user?.name[0]||""}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className='flex flex-col'>
                            <div>{user?.name||""}</div>
                            <div className='flex text-sm'><p className='font-semibold'>Email: </p>{user?.email||""}</div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                }
                {loadingChat &&<Loader2/>}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

      </div>
      <div>
        Chat App
      </div>
      <div className='flex items-center'>
        <div className='cursor-pointer'>
          <Bell/> 
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.pic} alt="@shadcn" />
                  <AvatarFallback>{user?.name[0]||""}</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
              <div className='w-20 pl-3 h-20 bg-white flex flex-col'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div variant="outline" className='cursor-pointer mt-2 hover:font-extrabold'>Profile</div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <div className='w-full text-center text-3xl'>
                          {user?.name||""}
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className='flex flex-col items-center justify-center'>
                          <div>
                          <Avatar className='size-24'>
                            <AvatarImage src={user?.pic} alt="@shadcn" />
                            <AvatarFallback className='text-xl'>{user?.name[0]||""}</AvatarFallback>
                          </Avatar>
                          </div>
                          <div className='flex flex-col '>
                            <div className='text-xl'>
                              Email:
                            </div>
                            <div className='text-2xl'>
                              {user?.email||""}
                            </div>
                          </div>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <div className='cursor-pointer mt-3 hover:font-extrabold' onClick={handleLogout}>Logout</div>
              </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

export default SideBar