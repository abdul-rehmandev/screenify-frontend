import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import MovieDetail from './Pages/MovieDetail';
import Profile from './Pages/Profile';
import Homepage from './Pages/Homepage';
import Notifications from './Pages/Notifications';
import CategoriesPage from './Pages/CategoriesPage';
import axios from "axios"
import { useSelector } from 'react-redux';
import AdminDashboard from './Admin/AdminPages/AdminDashboard';
import AdminCategory from './Admin/AdminPages/AdminCategory';
import AdminUsers from './Admin/AdminPages/AdminUsers';
import AdminMovies from './Admin/AdminPages/AdminMovies';

axios.defaults.baseURL = "http://127.0.0.1:5000/api";
axios.defaults.withCredentials = true

const App = () => {

  const user = useSelector(state => state?.user)

  const router = createBrowserRouter([
    {
      path: "/",
      element: user.userStatus == 0 ? <LoginPage /> : <Homepage />,
    },
    {
      path: "/register",
      element: <SignupPage />,
    },
    {
      path: "/home",
      element: user.userStatus == 0 ? <LoginPage /> : <Homepage />,
    },
    {
      path: "/watch/:id",
      element: user.userStatus == 0 ? <LoginPage /> : <MovieDetail />,
    },
    {
      path: "/profile",
      element: user.userStatus == 0 ? <LoginPage /> : <Profile />
    },
    {
      path: "/notifications",
      element: user.userStatus == 0 ? <LoginPage /> : <Notifications />
    },
    {
      path: "/category",
      element: user.userStatus == 0 ? <LoginPage /> : <CategoriesPage />
    },


    //Admin Routes
    {
      path: "/adminDashboard",
      element: user.userStatus == 0 && user.currentUser?.isAdmin == false ? <LoginPage /> : <AdminDashboard />
    },
    {
      path: "/adminCategory",
      element: user.userStatus == 0 && user.currentUser?.isAdmin == false ? <LoginPage /> : <AdminCategory />
    },
    {
      path: "/adminUsers",
      element: user.userStatus == 0 && user.currentUser?.isAdmin == false ? <LoginPage /> : <AdminUsers />
    },
    {
      path: "/adminMovies",
      element: user.userStatus == 0 && user.currentUser?.isAdmin == false ? <LoginPage /> : <AdminMovies />
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App