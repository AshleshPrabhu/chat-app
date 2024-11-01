import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

function Login() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loading, setLoading] = useState(null)
    const navigate=useNavigate()
    const getCredentials=(e)=>{
        e.preventDefault()
        setLoading(true)
        setPassword('12345678')
        setEmail('test@test.com')
        setLoading(false)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('http://localhost:5000/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  email, password}), 
            });
            // console.log("res", await response.json())
            const data = await response.json()
            if(!response.ok){
                toast.error("failed to login")
            }else{
                toast.success("login success")
                setLoading(false)
                localStorage.setItem("userInfo",JSON.stringify(data?.user))
                navigate('/chats')
                setEmail(null)
                setPassword(null)
            }
        } catch (error) {
            setLoading(false)
            toast.error(error?.message||"failed to login")
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='w-full flex items-center justify-center'>
        <form className='w-[90%]' onSubmit={handleSubmit}>
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
                <Button type='submit' className='rounded-xl w-[70%] mb-5 bg-blue-400 text-white'> 
                    {loading?<span>
                        <Loader2/>
                    </span>:<div>Login</div>}
                </Button>
            </div>
            <div className='w-full flex items-center justify-center'>
                <Button onClick={getCredentials} className='rounded-lg w-[70%] mb-5 bg-orange-300 text-white'> 
                {loading?<span>
                        <Loader2/>
                    </span>:<div>get user credentials </div>}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default Login