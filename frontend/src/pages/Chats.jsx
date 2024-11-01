import ChatBox from '@/components/ChatBox'
import MyChats from '@/components/MyChats'
import SideBar from '@/components/SideBar'
import { chatState } from '@/Context/chatProvider'
import React from 'react'

function Chats() {
  const {user} = chatState()
  return (
    <div className='min-h-screen w-full'>
      <div>
        {user&&<SideBar/>}
      </div>
      <div className='flex justify-between w-full h-full p-10'>
        {user&&<MyChats/>}
        {user&&<ChatBox/>}
      </div>
    </div>
  )
}

export default Chats