import React, { useRef } from 'react'
import Navbar from '../componnent/Navbar'
import Chats from '../componnent/Chats'
import { useEffect,useState } from 'react'
import Massage from '../componnent/Massage'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {io} from 'socket.io-client'
function Landingpage() {
  const[chats,setchats]=useState([])
  const[hide,sethide]=useState(false)
  const[reciveid,setrecivid]=useState('')
const[chatid,setchatid]=useState('')
const[online,setonline]=useState([])
const[massage,setmassage]=useState('')
const[start,setstart]=useState(false)
  const userid=localStorage.getItem('userid')


const socketref=useRef()
 useEffect(()=>{
  sethide(true)
  socketref.current=io(`${import.meta.env.VITE_URL}`)
socketref.current.emit('online users',userid)



// socketref.current.on('users', async (users) => {
//   setchats(users)


//   // Create an array to hold the promises for fetching user data
//   const userPromises = users.map(async (chat) => {
//     const response = await axios.get(`${import.meta.env.VITE_URL}/getuser/${chat.userid}`);
//     if (userid!==response.data.id) {
//     return response.data; // Return the data
      
//     }
//     return null
//   });

//   // Wait for all promises to resolve
//   const userData = await Promise.all(userPromises);
// const rs=userData.filter((op)=>(op!==null))
//   // Update online state with the new user data
//   setonline((prevOnline) => [...prevOnline, ...rs]); // Use function updater
//   console.log(rs); // Log the new online users
// });


const handleMessage = (text) => {
 setmassage(text);
};

socketref.current.on('remessage', handleMessage)

  return () => {
    socketref.current.disconnect();
   
    socketref.current.off('remessage', handleMessage);
  };
 },[])



const handleclickondiv=async(id)=>{
  if (id) {
    setstart(true)
    const fo=await axios.post(`${import.meta.env.VITE_URL}/create`,{
      senderid:userid,
      reciverid:id
    })
     setchatid(fo.data?._id)
    
    setrecivid(id)
    sethide(pre=>!pre)
  }

 
  
}


useEffect(()=>{
  const req=async()=>{
    const data=await axios.get(`${import.meta.env.VITE_URL}/getfrend/${userid}`)
   
 setonline(data?.data?.frendid)
  }
  req()
},[online])
const sendmesage=(text,id)=>{
 
  socketref.current.emit('message',text,id)
}
const navigate = useNavigate();
useEffect(()=>{
if (!userid) {
  navigate('/login')
}
},[userid,navigate])
  return (
    <div>
     
    
        <Navbar/>

<div style={{display:"flex" }}>
<div className={hide? 'chatboxc':'chatbox'}>
  {online?.map((user) => (
    <div key={user._id} onClick={() => handleclickondiv(user?._id)}>
      <Chats  username={user?.username} image={user?.image} id={user?._id} status={user?.status} bio={user?.bio} />


    </div>
  ))}
</div>
<div style={{width:"100%"}}>
<Massage  sethide={sethide} userid={reciveid} chatid={chatid} send={sendmesage} massagee={massage} start={start}/>

</div>

        </div>


      

        
     
    </div>
  )
}

export default Landingpage