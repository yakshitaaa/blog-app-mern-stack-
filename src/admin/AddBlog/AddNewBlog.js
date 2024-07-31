import React, { useEffect, useState } from 'react'
import '../AddCategory/AddCategory.css'
import {getDownloadURL, getStorage, ref as storageRef, uploadBytes} from 'firebase/storage'
import {app} from '../../firebase'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill';

const AddNewBlog = () => {
    const[blogName,setBlogName]=useState('')
    const[CategoryName,setCategoryName]=useState('')
    const[blog,setBlog]=useState('')
    const [file,setFile]=useState(null)
    const [imageUrl,setImageUrl]=useState(null);
    const [categoryList,setCategoryList]=useState([])

    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
      getCategory();
      console.log(location.state)
      if(location.state!=null)
        {
           setCategoryName(location.state.myData.category);
           setBlog(location.state.myData.description);
           setImageUrl(location.state.myData.imageUrl); 
           setBlogName(location.state.myData.title);
        }
    },[])
    const getCategory=()=>{
      axios.get('http://www.localhost:3000/category')
      .then(res=>{
          console.log(res.data.category)
          setCategoryList(res.data.category)
      })
      .catch(err=>{
          console.log(err)
      })
  }
    const fileHandler=(e)=>{
        setFile(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }
   
    const handleBlog=(content,delta,source,editor)=>{
       console.log(content);
       setBlog(content)
    }





    const submitHandler=async (event)=>{
      event.preventDefault();
      if(location.state==null){
        const storage=getStorage(app)
        const myRef=storageRef(storage,`blog/${Date.now()}`);
        await uploadBytes(myRef,file)
        const uploadedImageUrl= await getDownloadURL(myRef)
        console.log(uploadedImageUrl)
        axios.post('http://www.localhost:3000/blog',{
          title:blogName,
           category:CategoryName,
           description:blog,
          imageUrl:uploadedImageUrl
        },{
          headers:{
            Authorization:"Bearer "+localStorage.getItem('token')
          }
         })
         .then(res=>{
           console.log(res.data)
           // local storgae isiliye use kia h kyuki token dusre tab me bhi mil ske isiliye sessionStorage use nhi kia
       
            navigate('/admin/dashboard/blog');
         })
         .catch(err=>{
           console.log(err)
         })
      }
      else{
        if(file==null)
        {
          axios.put('http://www.localhost:3000/blog/'+location.state.myData._id,{
            title:blogName,
           category:CategoryName,
           description:blog,
           imageUrl:location.state.myData.imageUrl
          })
          .then(res=>{
            console.log(res.data)
            // local storgae isiliye use kia h kyuki token dusre tab me bhi mil ske isiliye sessionStorage use nhi kia
        
             navigate('/admin/dashboard/blog');
          })
          .catch(err=>{
            console.log(err)
          })
        }
        else{
          const storage=getStorage(app)
          const myRef=storageRef(storage,`${location.state.myData.imageUrl}`);
          await uploadBytes(myRef,file)
          const uploadedImageUrl= await getDownloadURL(myRef)
          console.log(uploadedImageUrl)
          axios.put('http://www.localhost:3000/blog/'+location.state.myData._id,{
            title:blogName,
            category:CategoryName,
            description:blog,
           imageUrl:uploadedImageUrl
           })
           .then(res=>{
             console.log(res.data)
             // local storgae isiliye use kia h kyuki token dusre tab me bhi mil ske isiliye sessionStorage use nhi kia
         
              navigate('/admin/dashboard/blog');
           })
           .catch(err=>{
             console.log(err)
           })
        }
      }
    }

  return (
    <div style={{height:'100vh',overflow:'scroll',padding:'10px'}}>
        <p>Add Blog</p>
        <form onSubmit={submitHandler}>
            <input value={blogName} onChange={(e)=>{setBlogName(e.target.value)}} type='text' placeholder='Blog Title'/>
            {/* <input value={blog} onChange={(e)=>{setBlog(e.target.value)}} type='text' placeholder='Blog'/> */}
            <ReactQuill style={{marginTop:'10px',height:'400px',marginBottom:'10px',backgroundColor:'white'}}
           onChange={handleBlog}
           value={blog}
            />
            {/* <input value={CategoryName} onChange={(e)=>{setCategoryName(e.target.value)}} type='text' placeholder='Category'/> */}
             <select onChange={(e)=>{setCategoryName(e.target.value)}} value={CategoryName} style={{width:'100%', height:'30px',marginTop:'100px', margin:'5px',padding:'5px',border:'none',borderRadius:'10px',fontSize:'15px'}}>
              <option>select category</option>
              {categoryList.map(data=>(
                <option key={data._id} value={data.name}>{data.name}</option>
              ))}
             </select>
            <input onChange={(e)=>{fileHandler(e)}} type='file'/>
           {imageUrl !=null && <img alt='Category'style={{width:'300px',height:'300px'}}src={imageUrl}/>}
            <button className='submit-btn' type='submit'>Submit</button>
        </form>
     </div>
  )
}



export default AddNewBlog