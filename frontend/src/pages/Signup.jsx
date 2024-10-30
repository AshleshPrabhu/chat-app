import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

function Signup() {
  return (
    <div className='w-full flex items-center justify-center'>
        <form className='w-[90%]'>
            <div className='mb-7'>
                <Label htmlFor='Name'>
                    Name
                </Label>
                <Input id='Name' placeholder='Enter your Name' className='w-[90%]'/>
            </div>
            
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
            <div className='mb-7'>
                <Label htmlFor='ConfirmPassword'>
                    Confirm Password
                </Label>
                <Input id='ConfirmPassword' placeholder='Confirm Password' type='password' className='w-[90%]'/>
            </div>
            <div className='mb-7'>
                <Label htmlFor='profileimg'>
                    Upload your Picture
                </Label>
                <Input id='profileimg' placeholder='Confirm Password' type='file' className='w-[90%]'/>
            </div>
            <div className='w-full flex items-center justify-center'>
                <Button className='rounded-lg w-10 bg-blue-400 text-white'> 
                    Signup
                </Button>
            </div>
        </form>
    </div>
  )
}

export default Signup