import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import './login.css'
function Login() {
    const[massage,setmassage]=useState('')
    const[login,setlogin]=useState({
        email:'',
        password:''
    })
    const navigate=useNavigate()

const handlesubit=async(e)=>{
    e.preventDefault()
    const data=await axios.post(`${import.meta.env.VITE_URL}/login`,login)
    localStorage.setItem('userid',data.data.data)
setmassage(data.data.massage)
setlogin({
    email:'',
    password:''
})
if (data.status==201) {
    navigate('/')
}

}
const handlechange=(e)=>{
    const{name,value}=e.target
    setlogin({
        ...login,
        [name]:value
    })

}

  return (
    <div>
        <div className='title'>
        <h2>Welcome Back to Mimchat</h2>

        </div>
     
        <div className='bodys'>
            {massage}
         
                <form onSubmit={handlesubit}>
                <div  className='boxlogin'>
                    <div>
                    <input type="email" className='io'
                    required
                    
                    placeholder='enter your email'
                    name='email'
                    value={login.email}
                    onChange={handlechange}
                    />
                    </div>
                   <div>
                   <input type="password" className='io'
                    placeholder='enter your password'
                    required
                    name='password'
                    value={login.password}
                    onChange={handlechange}
                    
                    />
                   </div>
                   
                <button type="submit">Login</button>
                <Link  to={'/register'}>register</Link>

                </div>

                </form>
           
        </div>
    </div>
  )
}

export default Login