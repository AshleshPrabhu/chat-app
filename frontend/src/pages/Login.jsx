import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

  return (
    <div className='w-full flex items-center justify-center'>
        <form className='w-[90%]'>
            <div className='mb-7'>
                <Label htmlFor='Email'>
                    Email
                </Label>
                <Input 
                    id='Email' 
                    placeholder='Enter your Email' 
                    type='email' 
                    className='w-[90%]'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='mb-7'>
                <Label htmlFor='Password'>
                    Password
                </Label>
                <Input 
                    id='Password' 
                    placeholder='Enter Password' 
                    type='password' 
                    className='w-[90%]'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}   
                />
            </div>
            <div className='w-full flex items-center justify-center'>
                <Button className='rounded-lg w-[70%] mb-2 bg-blue-400 text-white'> 
                    Login
                </Button>
            </div>
            <div className='w-full flex items-center justify-center'>
                <Button className='rounded-lg w-[70%] mb-5 bg-orange-300 text-white'> 
                    Get Guest User Credentials
                </Button>
            </div>
        </form>
    </div>
  )
}

export default Login