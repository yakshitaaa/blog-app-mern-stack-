import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../CategoryList/category.css'
import {deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadBytes} from 'firebase/storage'
import {app} from '../../firebase'
import { useNavigate } from 'react-router-dom'

const CategoryList = () => {
    const[category,setCategory]=useState([]);
    const navigate=useNavigate();


    useEffect(()=>{
    getCategory();
    },[])
    const getCategory=()=>{
        axios.get('http://www.localhost:3000/category')
        .then(res=>{
            console.log(res.data.category)
            setCategory(res.data.category)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const deletecategory=(categorydata)=>{
        if(window.confirm("Do you want to delete this data")){
            const storage=getStorage(app)
            const myRef=storageRef(storage,`${categorydata.imageUrl}`);
            deleteObject(myRef)
            .then(result=>{
                axios.delete('http://www.localhost:3000/category/'+categorydata._id)
                .then(res=>{
                    console.log(res)
                    getCategory()
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
 
{category.map(data=>(
    <div className='card' key={data._id}>
         <div style={{width:'25%'}}>
        <p>{data.name}</p>
        </div >
        <div style={{width:'35%'}}>
        <img className='cat-image' style={{height:'120px'}} src={data.imageUrl}/>
       </div>
       <div style={{width:'20%'}}>
        <button onClick={()=>{navigate('/admin/dashboard/editcategory',{state:{myData:data}})}}className='smBtn'>Edit</button>
       </div>
       <div style={{width:'20%'}}>
        <button onClick={()=>{deletecategory(data)}}className='smBtn'>Delete</button>
   </div>
    </div>
))}
    </div>
  )
}

export default CategoryList