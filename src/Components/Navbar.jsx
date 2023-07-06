import React, { useEffect, useState } from 'react'
import "../Styles/ComponentsStyles/navbar.scss"
import { Link } from 'react-router-dom'
import Modal from './Modal'
import MovieBox from "./MovieBox.jsx";
import { useSelector } from 'react-redux';

const Navbar = ({ setActive }) => {

    const [showModal, setShowModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const notification = useSelector(state => state?.notification?.notification)

    useEffect(() => {
        if (showModal == true) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

    }, [showModal])

    return (
        <>
            {showModal ? <Modal setShowModal={setShowModal}>
                <div className='searchModalContent'>
                    <h1>Searched Keyword : Sacred</h1>
                    <Link to="/watch/123" className="searchedMoviesBox link">
                        <div className='searchedMovie'>
                            <div className="searchMovieImage">
                                <img src="/assets/Images/banner.jpg" alt="banner" />
                            </div>
                            <div className="searchMovieName text-center">
                                Sacred Games
                            </div>
                        </div>
                    </Link>
                </div>
            </Modal> : ""}


            <div className='navbarContainer'>
                <img src="/assets/Images/logo.png" alt="logo" width={200} />
                <div className='navbarContent'>
                    <div className='searchInputBox'>
                        <input type="text" placeholder='Search' onChange={(e) => setSearchQuery(e.target.value)} />
                        <img src="https://img.icons8.com/pulsar-line/34/null/search.png" onClick={() => setShowModal(true)} />
                    </div>
                    <Link to="/home" className={`link ${setActive == 1 ? "active" : ""}`}>Home</Link>
                    <Link to="/category" className={`link ${setActive == 2 ? "active" : ""}`}>Categories</Link>
                    {notification?.isRead == false ? <><Link to="/notifications" className={`link ${setActive == 3 ? "iconActive" : ""}`}><img src="/assets/Images/notificationAlert.gif" style={{ backgroundColor: "none", width: "34px" }} /></Link></> : <>
                        <Link to="/notifications" className={`link ${setActive == 3 ? "iconActive" : ""}`}><img src="https://img.icons8.com/pulsar-line/34/null/appointment-reminders.png" /></Link></>}

                    <Link to="/profile" className={`link ${setActive == 4 ? "iconActive" : ""}`}><img src="https://img.icons8.com/pulsar-line/34/null/user-male-circle.png" /></Link>
                </div>
            </div>
        </>
    )
}

export default Navbar