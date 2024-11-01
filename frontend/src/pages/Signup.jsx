import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React,{useState} from 'react'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
function Signup() {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [pic, setPic] = useState(null)
    const navigate = useNavigate()
    const[loading,setLoading]=useState(false)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPic(reader.result); // Set the Base64 string as the pic state
            };
            reader.readAsDataURL(file); // Convert file to Base64
        }
    };
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, pic }), // Include Base64 string
            });
            console.log("re",response)
            if(!response.ok){
                toast.error("failed to signup")
            }else{
                toast.success("signup success")
                localStorage.setItem("userInfo",JSON.stringify(response?.user))
                setLoading(false)
                setConfirmPassword(null)
                setName(null)
                setEmail(null)
                setPassword(null)
                setPic(null)
                navigate('/')
    
            }
        } catch (error) {
            setLoading(false)
            toast.error(error?.message||"failed to signin")
        }finally{
            setLoading(false)
        }
    };
  return (
    <div className='w-full flex items-center justify-center'>
        <form className='w-[90%]' onSubmit={handleSubmit}>
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
                    onChange={handleFileChange}
                />
            </div>
            <div className='w-full flex items-center justify-center'>
                <Button type='submit' className='rounded-xl w-[70%] mb-5 bg-blue-400 text-white'> 
                    {loading?<span>
                        <Loader2/>
                    </span>:<div>Signup</div>}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default Signup
                    //TODO:  make show password functionality