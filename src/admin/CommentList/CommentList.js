import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../CommentList/comments.css'
import {deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadBytes} from 'firebase/storage'
import {app} from '../../firebase'
import { useNavigate } from 'react-router-dom'

const CommentList = () => {
    const[comments,setComments]=useState([]);
    const navigate=useNavigate();


    useEffect(()=>{
    getComment();
    },[])
    const getComment=()=>{
        axios.get('http://www.localhost:3000/comment')
        .then(res=>{
            console.log(res.data.comment)
            setComments(res.data.comment)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const deletecomment=(commentId)=>{
        if(window.confirm("Do you want to delete this comment?")){
                axios.delete('http://www.localhost:3000/comment/'+commentId)
                .then(res=>{
                    console.log(res)
                    getComment()
                })
                .catch(err=>{
                    console.log(err)
                })       
    }
    }
  return (
    <div className='comment-container'>
{comments.map(data=>(
    <div className='comment-card' key={data._id}>
         <div style={{width:'25%'}}>
          <div style={{ height:'100px',alignItems:'center',display:'flex',justifyContent:'space-between'}}>
        <p style={{width:'250px'}}>{data.email}</p>
        <button onClick={()=>{deletecomment(data._id)}} style={{border:'none',width:'100px',height:'30px',borderRadius:'5px' ,padding:'5px',backgroundColor:'yellow',marginLeft:'20px'}}>delete</button>
        </div>
        <p style={{width:'250px'}}>{data.commentText}</p>
        <p style={{width:'250px'}}>{data.timestamp}</p>
        </div >
       
    </div>
))}
    </div>
  )
}



export default CommentList