import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots} from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane ,faFile,faTrash} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react'

function Massage({userid,chatid,send,massagee,start,sethide}) {
    const userlo=localStorage.getItem('userid')
    const[username,setusername]=useState('')
    const[image,setimage]=useState('')
    const[massage,setmassage]=useState('')
    const[allmassage,setallmassages]=useState([])
    const[file,setfile]=useState('')
    const scrollref=useRef()
useEffect(()=>{
    const userfet=async()=>{
        if (userid) {
            const usersd=await axios.get(`${import.meta.env.VITE_URL}/getuser/${userid}`)
            setimage(usersd?.data?.image)
            setusername(usersd?.data?.username)
        }
   


    }

    userfet()
   
},[userid])


useEffect(()=>{
    const re=async()=>{
if (chatid) {
    const messagesdata=await axios.get(`${import.meta.env.VITE_URL}/getmes/${chatid}`)
    setallmassages(messagesdata?.data)
}
      
    }
    re()
},[chatid,massagee,allmassage])


useEffect(() => {
    if (scrollref.current) {
       
            scrollref.current.scrollIntoView({ behavior: 'smooth' });
        
    }
}, [allmassage]);

const onsend=async()=>{
    const newForm =new FormData()
    newForm.append('chatid',chatid)
    newForm.append('userid',userlo)
    newForm.append('text',massage)
    if (file) {
        newForm.append('file',file)
    }

    const massages=await axios.post(`${import.meta.env.VITE_URL}/addmassage`,newForm ,{headers:{
        
        'Content-Type':'multypart/form-data'
}})
    
    send({text:massage,id:userid})
   setmassage('')
   setfile('')
}

const delet=async()=>{
    
    try {
        if (confirm('are sure to clear all')) {
            const deleted=await axios.post(`${import.meta.env.VITE_URL}/delet/${chatid}`)
            
        }
       
    } catch (error) {
        
    }
}

if (!start) {
   return <>
    <h2>tap to start</h2>
    </>
}

  return (
    <div style={{width:'100%' }}>

        <div className='userdetails'>
         <div className='userdetails1'>
         <span onClick={()=>sethide(pre=>!pre)} className='list'> <FontAwesomeIcon icon={faCommentDots} style={{fontSize:"20px"}} /></span>

            <img src={image} alt="" style={{width:'40px',height:'40px',borderRadius:'20px'}} />
            <span>{username}</span>
         </div>
<FontAwesomeIcon icon={faTrash} style={{color: "#ff270f",padding:"5px"}}   onClick={delet}  />


        </div>


        <div className="chat-container">
            <div className="message-area">
                {  allmassage?.length>0? (allmassage?.map((d, index) => (
                    
  <div key={index} className={`message ${userlo === d?.userid ? 'user' : 'other'}`}>
                       <div  className={userlo === d?.userid ? 'area' : 'areal'}>
                        
                        <div style={{fontSize:'14px',fontFamily:'monospace'}}>
                        {d?.text}
                            </div>
                            {
                                d.file ?(<>
                                    <img style={{width:"120px"}}  src={d.file} alt="" /><br/>
                                    <a href={d.file} download ={d.file}> open</a>
                                    </>
                                   
                                ):(
                                
                                    <a href={d.file} >{d.filetype}</a>
                                  
                                )
                            }
                        <span style={{fontSize:"10px",color:"grey"}}>{new Date(d?.createdAt).toLocaleString()}</span>
                        </div> 
                    </div>
                
                  
                ))):''}
               <span ref={scrollref} style={{ display: 'block', height: '1px' }}/>

            </div>
            
        </div>


        <div className='last'>
         <input className='inputs' onChange={(e)=>setmassage(e.target.value)} value={massage} name='text' type="text" placeholder='write your massages' />
         <div style={{width:'25%',justifyContent:'space-between',display:'flex'}}>
         <label htmlFor='fileInput' ><FontAwesomeIcon icon={faFile} style={{color: "#74C0FC",}} /></label>
         <input hidden  id="fileInput" type="file" placeholder='send photos and videos' onChange={(e)=>setfile(e.target.files[0])} />
         <span  onClick={onsend} className='nn' ><FontAwesomeIcon icon={faPaperPlane} style={{color: "#74C0FC",fontSize:"20px"}} /></span>
         <span style={{fontSize:"5px"}}>{file.name}</span>

         </div>
       
        </div>
    </div>
  )
}

export default Massage