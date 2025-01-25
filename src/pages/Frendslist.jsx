import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
function Frendslist() {
  const[users,setusers]=useState([])
const userid=localStorage.getItem('userid')

useEffect(()=>{
  const req=async()=>{
    const data=await axios.get(`${import.meta.env.VITE_URL}/getfrend/${userid}`)
 setusers(data?.data?.frendid)
 
  }
  req()
},[users])

const remove=async(userid2)=>{
    await axios.post(`${import.meta.env.VITE_URL}/remove`,{
    userid1:userid,
    userid2:userid2
  })
}
if (!users.length>0) {
  return <div style={{justifyContent:"center",alignItems:"center", width:'100%',height:'100vh', display:"flex"}}>
    freind not found
  </div>
}
  return (
    <div>
      

      
        <div>
        {
        users.map((user)=>(
          <div key={user?._id} className='div1'>
            <div>
              <img src={user?.image} alt="" className='imageall' />
            </div>
            <div className='div2'>
              <span>{user?.username}</span>
            </div>
            <div>
              <button className='btn6' onClick={()=>remove(user?._id)} >Remove</button>
            </div>
          </div>
        ))
      }
        </div>
    </div>
  )
}

export default Frendslist