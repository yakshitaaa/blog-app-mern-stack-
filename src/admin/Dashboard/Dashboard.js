import React from 'react'
import '../Dashboard/dashboard.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';

const Dashboard = () => {
  const navigate=useNavigate();
  const logoutHandler=()=>{
    localStorage.clear();
    navigate('/admin/login')
  }
  return (
    <div className='container'>
        <div className='sideNav'>
        <div className='logoContainer'>
          <img alt='logo' className='logo' src={require('../../assets/blog.avif')} />
          <h1 className='logoHeading'>Blog App</h1>
        </div>
        <Link to='/admin/dashboard' className='link'>
        {/* <DashboardIcon/> */}
        <span>Dashboard</span></Link>
        <Link to='/admin/dashboard/blog' className='link'>Blog List</Link>
        <Link to='/admin/dashboard/addblog' className='link'>Add Blog</Link>
        <Link to='/admin/dashboard/category' className='link'>Category List</Link>
        <Link to='/admin/dashboard/addcategory' className='link'>Add Category</Link>
        <Link to='/admin/dashboard/comment' className='link'>Comments</Link>
        <button className='link' onClick={logoutHandler} style={{border:'none',backgroundColor:'transparent',color:'white',display:'flex',justifyContent:'start',fontSize:'15px'}}>Logout</button>
        </div>
        <div className='mainContent'>
          <Outlet/>
        </div>
        
        </div>
  )
}

export default Dashboard