import React, { useEffect } from 'react'
import "../Styles/PagesStyles/notification.scss"
import Navbar from '../Components/Navbar'
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import axios from 'axios';
import { handleNotification } from '../Redux/notificationSlice';
import toast, { Toaster } from 'react-hot-toast';

const Notifications = () => {

    const notifications = useSelector(state => state?.notification?.notification)
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        const fetchData = async () => {
            await axios.post("/notification/read", {
                notificationId: notifications._id
            }).then((res) => {
                dispatch(handleNotification(res.data.result))
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }

        fetchData();

    }, [])

    const handleDeleteNotification = async (deleteId) => {
        await axios.post("/notification/delete", {
            notificationId: notifications._id,
            deleteNotificationId: deleteId
        }).then((res) => {
            toast.success(res.data.message)
            console.log(res.data.result)
            dispatch(handleNotification(res.data.result))
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Screenify - Notifications</title>
            </Helmet>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Loader />
            <div className="container-fluid notificationContainer">
                <Navbar setActive={3} />
                <div className='notificationBox'>
                    <h1>Notifications</h1>
                    {notifications?.messages?.map((item, index) => (
                        <div className='singleNotification' key={index}>
                            <div className="noticationMessage">
                                {item.message}
                            </div>
                            <div className="notificationIcon">
                                <img src="https://img.icons8.com/pulsar-line/34/null/delete-forever.png" onClick={() => handleDeleteNotification(item._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Notifications