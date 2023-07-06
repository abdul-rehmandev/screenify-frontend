import React, { useEffect } from 'react'
import "../Styles/PagesStyles/homepage.scss"
import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import Categories from '../Components/Categories'
import { Helmet } from "react-helmet";
import TopTen from "../Components/TopTen";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { handleNotification } from '../Redux/notificationSlice'

const Homepage = () => {

    const user = useSelector(state => state?.user?.currentUser)
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        const fetchData = async () => {
            await axios.post("/notification/getNotifications", {
                userId: user._id
            }).then((res) => {
                dispatch(handleNotification(res.data.result))
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }

        fetchData()
    }, [])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Screenify - Home</title>
            </Helmet>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="container-fluid p-0">
                <Navbar setActive={1} />
                <HeroSection />
                <TopTen />
                <Categories />
                <div className='text-center py-2'>
                    Developed by Abdul Rehman <a target='_blank' href="https://github.com/meherrehman">
                        <img src="https://img.icons8.com/ios/34/null/github--v1.png" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default Homepage