import React, { useEffect, useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios'

function Allusers() {
  const [users,setusers]=useState([])
  const[username,setusername]=useState('')
const userid=localStorage.getItem('userid')
useEffect(()=>{
const fether=async()=>{
const dt=await axios.get(`${import.meta.env.VITE_URL}/alluser/${userid}`)
setusers(dt?.data)


}
fether()
},[])

const creatcon=async(senderid)=>{
  const fo=await axios.post(`${import.meta.env.VITE_URL}/addrequiest`,{
   senderid:userid,
   reciverid:senderid
  })
}
const serach=async()=>{
  const fa=await axios.post(`${import.meta.env.VITE_URL}/find`,{username:username})
  setusers(fa.data)
}
  return (
    <div>
{
  !users?(
<div style={{width:"100%",height:'100%',justifyContent:"center",display:'flex'}}>
  <div >
      no new user found
  </div>
</div>
  ):(

    <div style={{alignItems:'center',justifyContent:'center',display:'flex',flexDirection:'column'}}>
      <div>
        <div style={{width:"75%",border:'solid #ccc 0.5px',justifyContent:"space-between",display:'flex',padding:'10px'}}>
          <input  style={{width:'80%',border:"none",outline:"none"}}  name='search' type="text" placeholder='search freeinds'  value={username} onChange={(e)=>setusername(e.target.value)} />
          <FontAwesomeIcon icon={faSearch} style={{color: "#74C0FC",}} onClick={serach} />

        </div>
      </div>
      {
        users?.length>0? (users.map((user)=>(
          <div key={user?._id} className='div1'>
            <div>
              <img src={`${import.meta.env.VITE_URL}/${user.image}`} alt="" className='imageall' />
            </div>
            <div className='div2'>
              <span>{user?.username}</span>
              <span style={{fontSize:'12px',color:"gray"}}>Joind at { new Date(user?.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <button className='btn6'  onClick={()=>creatcon(user?._id)} >Request</button>
            </div>
          </div>
        ))):<>user not found</>
      }
    </div>
  )



}
        
    </div>
  )
}

export default Allusers