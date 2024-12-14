import React, { useState, } from 'react'
import {useNavigate,Link} from 'react-router-dom'

import axios from 'axios'
import './login.css'
function Register() {
    const [pop,setpop]=useState('')
    const Navigate=useNavigate()
const [form,setform]=useState({
    email:"",
    username:"",
    password:""
})
const handlesubmit=async(e)=>{
    e.preventDefault()
  const responce=await axios.post(`${import.meta.env.VITE_URL}/register`,{
    email:form.email,
    username:form.username,
    password:form.password
  }
  )
setpop(responce.data)
console.log(responce)

if (responce.status==201) {
    setform({
        email:"",
        username:"",
        password:""
    })
    Navigate('/login')
    
}
}
const handlechange=(e)=>{
    const{name,value}=e.target
    setform({...form,
        [name]:value
    })
}

  return (

    <div className='bodys'>
    <div >
    <div className='title'>
        <h2>Mimchat</h2>

        </div>
    
       
<div className='boxlogin '>
    
    <form onSubmit={handlesubmit}>
    {pop}
        <input type="email" className='io'
        placeholder='email address'
        name='email'
        value={form.email}
onChange={handlechange}
required

        />
        <input type="text" className='io'
placeholder='username'
name='username'
value={form.username}
onChange={handlechange}

required

/>
        <input type="password" className='io'
    placeholder='pasword'   
    name='password'   
    max={12}
min={5}
    value={form.password}
onChange={handlechange}
required

        />
    <button type="submit">Register</button>
    <Link to={'/login'}>Login</Link>

    </form>
    
</div>
    </div> </div>
  )
}

export default Register