import React, { useEffect } from 'react'
import axios from 'axios'
function Chats({image,username,bio,status}) {



  return (
    <div className='chatdiv'>
     <div className='dib'>
      
      <img className='imagechat'   src={image}alt="" />
     
     <div className='biodiv'>
      <span>{username}</span>
      <span>{bio}</span>
     </div>
     
     </div>
      
    
     <div  className={status=='online'? 'online':'ofline'}>
     </div>

    </div>
  )
}

export default Chats