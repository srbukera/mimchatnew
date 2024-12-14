import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Reuiest() {
const[user,setusers]=useState([])
const userid=localStorage.getItem('userid')

useEffect(()=>{
  const req=async()=>{
    const data=await axios.get(`${import.meta.env.VITE_URL}/getrequiest/${userid}`)
 setusers(data.data)
    
  }
  req()
},[user])

const accept=async(requistid)=>{
  const dataa=await axios.post(`${import.meta.env.VITE_URL}/addfrend/${requistid}`)
  console.log(dataa)
}
if (!user.length>0) {
  return <div style={{justifyContent:"center",alignItems:"center", width:'100%',height:'100vh', display:"flex"}}>
    <div>
      new requiests not found
    </div>
  </div>
}
  return (
    <div>
<div>
  {
    user?.map((user)=>(
      <div key={user?._id} className='div1'>
      <div>
        <img src={`${import.meta.env.VITE_URL}/${user.senderid?.image}`} alt="" className='imageall' />
      </div>
      <div className='div2'>
        <span>{user?.senderid?.username}</span>
      </div>
      <div>
        <button className='btn6' onClick={()=>accept(user?._id)} >accept</button>
      </div>
    </div>
    ))
  }
</div>
    </div>
  )
}

export default Reuiest