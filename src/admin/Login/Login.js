import React, { useState } from 'react'
import '../Login/login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userName,setUserName]= useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
   
  const submitHandler=(event)=>{
    event.preventDefault();
    console.log(userName,password);
    axios.post('http://www.localhost:3000/auth/admin/login',{
      userName:userName,
      password:password
    })
    .then(res=>{
      console.log(res.data)
      // local storgae isiliye use kia h kyuki token dusre tab me bhi mil ske isiliye sessionStorage use nhi kia
      localStorage.setItem('email',res.data.email);
      localStorage.setItem('fullName',res.data.fullName);
      localStorage.setItem('token',res.data.token);
      navigate('/admin/dashboard');
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className='loginContainer'>
   
      <form onSubmit={submitHandler} className='loginBox'>
        <img alt='yakk' className='image' src={require('../../assets/blog.avif')}/>
        <h1 align="center">Blog App</h1>
        <input onChange={(e)=>{setUserName(e.target.value)}} placeholder='username'/>
        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='password'/>
        <input className='submitbtn' type='submit' value='login'></input>
        </form>
     </div>
   
  )
}

export default Login