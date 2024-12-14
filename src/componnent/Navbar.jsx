import React, { useState ,useEffect}  from 'react'
import './landing.css'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faListAlt,faPortrait,faUserFriends,faPeopleLine} from '@fortawesome/free-solid-svg-icons';


import axios from 'axios'
function Navbar() {
const[username,setusername]=useState('')
const[imges,setimages]=useState('')
const userid=localStorage.getItem('userid')
useEffect(()=>{
  const fetch=async()=>{
      const userdata=await axios.get(`${import.meta.env.VITE_URL}/getuser/${userid}`)
   setusername(userdata?.data?.username)
 setimages(userdata?.data?.image)
  }
  fetch()
  
      },[userid])

      const logout=()=>{
        localStorage.clear()
        Navigate('/login')
      }
  return (
 
      <div className='navbar'>

        <div className='navbar1'>
        <span onClick={logout}>Logout</span>

{/* <div className='profile'><img  src={`${import.meta.env.VITE_URL}/${imges}`}alt="image" style={{width:'45px', borderRadius:'25px',height:'45px',padding:"8px"}}  />
<span style={{fontSize:"12px"}}>{username}</span>
</div> */}
        </div>
    <div className='nvbar3'  >
      <Link to={'/allusers'} style={{ textDecoration: 'none' ,color:'white'}}><FontAwesomeIcon icon={faListAlt}/>
      </Link>
      <Link to={'/user'}  style={{ textDecoration: 'none' ,color:'white'}} >
      <span><FontAwesomeIcon icon={faPortrait}/></span>
      
      </Link>
      <Link to={'/req'}  style={{ textDecoration: 'none',color:'white' }}>
      <div><FontAwesomeIcon icon={faPeopleLine}/></div></Link>

      <Link to={'/frend'}  style={{ textDecoration: 'none',color:'white' }}>
      <div><FontAwesomeIcon icon={faUserFriends}/></div></Link>
    </div>
      </div>
    
  )
}

export default Navbar