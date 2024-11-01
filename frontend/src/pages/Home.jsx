import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from './Login'
import Signup from './Signup'
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate()
  const[user,setUser]=useState()
    useEffect(()=>{
        const user=localStorage.getItem('userInfo')
        if(user){
          const userInfo=JSON.parse(localStorage.getItem('userInfo'))
          setUser(userInfo)
          if(userInfo){
              navigate('/chats')
          }
        }
    },[])
  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-black' >
      <div className='rounded-3xl w-[40%]  bg-white'>
      <Tabs defaultValue="login" className="w-full h-full">
        <TabsList className='w-full h-14'>
          <TabsTrigger value="login" className='w-[45%] h-10 rounded-xl'>Login</TabsTrigger>
          <TabsTrigger value="signup" className='w-[45%] h-10 rounded-xl'>Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><Login/></TabsContent>
        <TabsContent value="signup"><Signup/></TabsContent>
      </Tabs>

      </div>
    </div>
  )
}

export default Home