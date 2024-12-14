import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LOad from '../componnent/LOad'
import { faArrowCircleLeft,faEdit} from '@fortawesome/free-solid-svg-icons';

function Profile() {
const[username,setusername]=useState('user')
const[image,setimage]=useState('')
// const[freinds,setfreinds]=useState(0)
const[img,setimg]=useState('')
const[updatedbio,setupdatedbio]=useState("")
const[bio,setbio]=useState('')
const[loading,setloading]=useState(null)
const[hidden,sethidden]=useState(true)
    const imageref=useRef()
const userid=localStorage.getItem('userid')
    const handleimage=()=>{
        imageref.current.click()

    }

const handlechange=(e)=>{
setimage(e.target.files[0])
}
// useEffect(()=>{
// const y=async()=>{
//     const list=await axios.get(`${import.meta.env.VITE_URL}/list/${userid}`)
//     setfreinds(list?.data)
// }
//   y()
// },[userid])
const upload = async () => {
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append('image', image);
  
      // Making the API request
      const response = await axios.post(`${import.meta.env.VITE_URL}/update/${userid}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Handle the response if successful
      console.log('Upload successful:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error during upload:', error.response || error.message);
  
      // If the error response is available, log more details
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    } finally {
      setloading(false);
    }
  };

    useEffect(()=>{
const fetch=async()=>{

    const userdata=await axios.get(`${import.meta.env.VITE_URL}/getuser/${userid}`)
    console.log(userdata)
 setusername(userdata?.data?.username)
setimg(userdata?.data?.image)
setbio(userdata?.data?.bio)
setloading(false)
}
fetch()

    },[userid,image,loading,hidden])

    const hiddens=()=>{
        sethidden(false)
    }
     const updatebio=async()=>{
       const f=await axios.post(`${import.meta.env.VITE_URL}/bio/${userid}`,{bio:updatedbio}
       )
       console.log(f)
       setupdatedbio('')
       sethidden(true)
     }  
    
  return (
    <div style={{background:""}}>
  <Link to={'/'}  ><FontAwesomeIcon icon={faArrowCircleLeft} style={{fontSize:'19px',padding:'5px'}}/></Link>
    <div className='profile'>
        
        <div style={{background:"white",height:"50%",width:"42%" ,padding:"10px",borderRadius:"20px"}}>
  

          {
            !loading?<>
            
            <div >
                <input 
               ref={imageref}  type="file" onChange={handlechange} style={{display:'none'}}/>
                <img onClick={handleimage} src={img} alt="no image"   style={{width:'120px' ,borderRadius:'50px',height:'120px'}}/>
            </div>
            {
   
                image?<>          <button onClick={upload}>upload</button>  </>:""
            }

            <div>
                <h5> username:{username}</h5>
                {/* <span>freinds:{freinds}</span> */}
                <div style={{display:"flex",width:"auto",justifyContent:"space-between"}}>
                <b> bio:{bio}</b>
                <button onClick={hiddens} style={{width:"20px",height:"15px" ,margin:'0px',padding:"0px" ,fontSize:"10px"}}>
<FontAwesomeIcon icon={faEdit}/>
                    
                </button>

                </div>
                <div>
                <input className='op' onChange={(e)=>(setupdatedbio(e.target.value))} value={updatedbio} name='bio'   type="text" hidden={hidden} />
                <button style={{width:'50px',marginLeft:'5px',fontSize:'8px',height:'15px'}} hidden={hidden} onClick={updatebio}>update</button>
                </div>
               

            </div>
            </>:<LOad/>
          }
        </div>
    </div></div>
  )
}

export default Profile