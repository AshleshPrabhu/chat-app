import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

function Login() {
  return (
    <div className='w-full flex items-center justify-center'>
        <form className='w-[90%]'>
            <div className='mb-7'>
                <Label htmlFor='Email'>
                    Email
                </Label>
                <Input id='Email' placeholder='Enter your Email' type='email' className='w-[90%]'/>
            </div>
            <div className='mb-7'>
                <Label htmlFor='Password'>
                    Password
                </Label>
                <Input id='Password' placeholder='Enter Password' type='password' className='w-[90%]'/>
            </div>
            <div className='w-full flex items-center justify-center'>
                <Button className='rounded-lg w-10 bg-blue-400 text-white'> 
                    Login
                </Button>
            </div>
            <div className='w-full flex items-center justify-center'>
                <Button className='rounded-lg w-10 bg-orange-300 text-white'> 
                    Get Guest User Credentials
                </Button>
            </div>
        </form>
    </div>
  )
}

export default Login