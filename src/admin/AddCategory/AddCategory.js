import React, { useEffect, useState } from 'react'
import '../AddCategory/AddCategory.css'
import {getDownloadURL, getStorage, ref as storageRef, uploadBytes} from 'firebase/storage'
import {app} from '../../firebase'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const[CategoryName,setCategoryName]=useState('')
    const [file,setFile]=useState(null)
    const [imageUrl,setImageUrl]=useState(null);
    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
      console.log(location.state)
      if(location.state!=null)
        {
           setCategoryName(location.state.myData.name);
           setImageUrl(location.state.myData.imageUrl); 
        }
    },[])
    const fileHandler=(e)=>{
        setFile(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const submitHandler=async (event)=>{
      event.preventDefault();
      if(location.state==null){
      
        console.log(CategoryName,file)
        const storage=getStorage(app)
        const myRef=storageRef(storage,`category/${Date.now()}`);
        await uploadBytes(myRef,file)
        const uploadedImageUrl= await getDownloadURL(myRef)
        console.log(uploadedImageUrl)
        axios.post('http://www.localhost:3000/category',{
           name:CategoryName,
          imageUrl:uploadedImageUrl
         })
         .then(res=>{
           console.log(res.data)
           // local storgae isiliye use kia h kyuki token dusre tab me bhi mil ske isiliye sessionStorage use nhi kia
       
            navigate('/admin/dashboard/category');
         })
         .catch(err=>{
           console.log(err)
         })
      }
      else{
        if(file==null)
        {
          axios.put('http://www.localhost:3000/category/'+location.state.myData._id,{
            name:CategoryName,
           imageUrl:location.state.myData.imageUrl
          })
          .then(res=>{
            console.log(res.data)
            // local storgae isiliye use kia h kyuki token dusre tab me bhi mil ske isiliye sessionStorage use nhi kia
        
             navigate('/admin/dashboard/category');
          })
          .catch(err=>{
            console.log(err)
          })
        }
        else{
          console.log(CategoryName,file)
          const storage=getStorage(app)
          const myRef=storageRef(storage,`${location.state.myData.imageUrl}`);
          await uploadBytes(myRef,file)
          const uploadedImageUrl= await getDownloadURL(myRef)
          console.log(uploadedImageUrl)
          axios.put('http://www.localhost:3000/category/'+location.state.myData._id,{
             name:CategoryName,
            imageUrl:uploadedImageUrl
           })
           .then(res=>{
             console.log(res.data)
             // local storgae isiliye use kia h kyuki token dusre tab me bhi mil ske isiliye sessionStorage use nhi kia
         
              navigate('/admin/dashboard/category');
           })
           .catch(err=>{
             console.log(err)
           })
        }
      }
    }

  return (
    <div className='cat-container'>
        <p>Add Category</p>
        <form onSubmit={submitHandler} className='cat-form'>
            <input value={CategoryName} onChange={(e)=>{setCategoryName(e.target.value)}} type='text' placeholder='Category Name'/>
            <input onChange={(e)=>{fileHandler(e)}} type='file'/>
           {imageUrl !=null && <img alt='Category'style={{width:'100%',height:'300px'}}src={imageUrl}/>}
            <button className='submit-btn' type='submit'>Submit</button>
        </form>
     </div>
  )
}

export default AddCategory