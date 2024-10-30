import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React,{useState} from 'react'

function Signup() {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [pic, setPic] = useState(null)
  return (
    <div className='w-full flex items-center justify-center'>
        <form className='w-[90%]'>
            <div className='mb-7'>
                <Label htmlFor='Name'>
                    Name
                </Label>
                <Input 
                    id='Name' 
                    placeholder='Enter your Name' 
                    className='w-[90%]'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            
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
            //TODO:  make show password functionality
            <div className='mb-7'>
                <Label htmlFor='ConfirmPassword'>
                    Confirm Password
                </Label>
                <Input 
                    id='ConfirmPassword' 
                    placeholder='Confirm Password' 
                    type='password' 
                    className='w-[90%]'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className='mb-7'>
                <Label htmlFor='profileimg'>
                    Upload your Picture
                </Label>
                <Input 
                    id='profileimg' 
                    placeholder='Confirm Password' 
                    type='file' 
                    className='w-[90%]'
                    value={pic}
                    onChange={(e) => setPic(e.target.files[0]||"")}
                />
            </div>
            <div className='w-full flex items-center justify-center'>
                <Button className='rounded-xl w-[70%] mb-5 bg-blue-400 text-white'> 
                    Signup
                </Button>
            </div>
        </form>
    </div>
  )
}

export default Signup