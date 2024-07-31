import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login/Login';
import Dashboard from './admin/Dashboard/Dashboard';
import { Home } from '@mui/icons-material';
import BlogList from './admin/BlogList/BlogList';
import AddNewBlog from './admin/AddBlog/AddNewBlog';
import CategoryList from './admin/CategoryList/CategoryList';
import AddCategory from './admin/AddCategory/AddCategory';
import CommentList from './admin/CommentList/CommentList';
const router=createBrowserRouter([
  {path:'admin',element:<AdminLayout/>,children:[
    {path:'login',element:<Login/>},
    {path:'dashboard',element:<Dashboard/>,children:[
      {path:'',element:<Home/>},
      {path:'blog',element:<BlogList/>},
      {path:'addblog',element:<AddNewBlog key="addblog" mode="addblog"/>},
      {path:'category',element:<CategoryList/>},
      {path:'addcategory',element:<AddCategory key="add"  mode="add"/>},
      {path:'comment',element:<CommentList/>},
      {path:'editcategory',element:<AddCategory key="edit" mode="edit"/>},
      {path:'editblog',element:<AddNewBlog key="editblog" mode="editblog"/>}

    ]}
  ]}

])

function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
      
    </>
  );
}

export default App;
