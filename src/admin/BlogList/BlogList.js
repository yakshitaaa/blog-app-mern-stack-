import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../CategoryList/category.css'
import {deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadBytes} from 'firebase/storage'
import {app} from '../../firebase'
import { useNavigate } from 'react-router-dom'

const BlogList = () => {
    const[blogs,setBlogs]=useState([]);
    const navigate=useNavigate();


    useEffect(()=>{
    getBlogs();
    },[])
    const getBlogs=()=>{
        axios.get('http://www.localhost:3000/blog')
        .then(res=>{
            console.log(res.data.blog)
            setBlogs(res.data.blog)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const deleteBlog=(blogdata)=>{
        if(window.confirm("Do you want to delete this data")){
            const storage=getStorage(app)
            const myRef=storageRef(storage,`${blogdata.imageUrl}`);
            deleteObject(myRef)
            .then(result=>{
                axios.delete('http://www.localhost:3000/blog/'+blogdata._id,{
                    headers:{
                      Authorization:"Bearer "+localStorage.getItem('token')
                    }}
                )
                .then(res=>{
                    console.log(res)
                    getBlogs()
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            .catch(error=>{
                console.log(error);
            })
       
    }
    }
  return (
    <div>
 
{blogs.map(data=>(
    <div className='card' key={data._id}>
         <div style={{width:'25%'}}>
        <p>{data.title}</p>
        </div >
        <div style={{width:'35%',margin:'20px'}}>
        <img className='cat-image' style={{height:'120px'}} src={data.imageUrl}/>
       </div>
       <div style={{width:'20%'}}>
        <button onClick={()=>{navigate('/admin/dashboard/editblog',{state:{myData:data}})}}className='smBtn'>Edit</button>
       </div>
       <div style={{width:'20%'}}>
        <button onClick={()=>{deleteBlog(data)}}className='smBtn'>Delete</button>
   </div>
    </div>
))}
    </div>
  )
}

export default BlogList