import React from 'react'
import "../Styles/PagesStyles/profile.scss"
import Navbar from '../Components/Navbar'
import { Helmet } from "react-helmet";
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutCurrentUser } from '../Redux/userSlice';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.currentUser)

    const handleLogout = async () => {
        await axios.post("/auth/logout").then((res) => {
            console.log(res.data.message)
            dispatch(logoutCurrentUser());
            navigate("/")
        }).catch((err) => {
            console.log(err.response.data.message)
        })
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Screenify - profile</title>
            </Helmet>
            <Navbar setActive={4} />
            <div className="container-fluid profileContainer">
                <div className='profileDetails'>
                    <div className='profilePic'>
                        <img src={user.profileImage} />
                    </div>
                    <div className='profileInfo'>
                        <b>Name : <span>{user.username}</span></b>
                        <b>Email : <span>{user.email}</span></b>
                        {user.isAdmin === false ? <div>
                            <b>Subscribed plan : <span>Basic</span></b>
                            <b>&nbsp; Subscription ended date : <span>15 may 2023 </span></b>
                        </div> : ""}
                        <div className='profileActions'>
                            <Link to={user.isAdmin == true ? "/adminDashboard" : "/profile"}>
                                <img src="https://img.icons8.com/pulsar-line/48/null/edit-user.png" />
                            </Link>
                            <img src="https://img.icons8.com/pulsar-line/48/null/exit.png" onClick={handleLogout} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile