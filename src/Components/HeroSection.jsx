import React, { useEffect, useState } from 'react'
import "../Styles/ComponentsStyles/heroSection.scss"
import Modal from './Modal'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { handleLoader } from '../Redux/loaderSlice'
import Loader from './Loader'

const HeroSection = () => {

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false)
    const [MainVideo, setMainVideo] = useState(false)

    const [featuredMovie, setFeaturedMovie] = useState("")

    const playVideo = () => {
        setShowModal(true)
    }

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

        const fetchData = async () => {
            dispatch(handleLoader(true))
            await axios.get("/movie/featured").then((res) => {
                setFeaturedMovie(res.data.result)
                dispatch(handleLoader(false))
            }).catch((err) => {
                dispatch(handleLoader(false))
                toast.error(err.response.data.message)
            })
        }
        fetchData();

        const timeoutId = setTimeout(() => {
            setMainVideo(true);
        }, 5000);

        return () => {
            clearTimeout(timeoutId);
        };

    }, [showModal])

    return (
        <>
            {showModal ? <Modal setShowModal={setShowModal}>
                <div className='heroSectionModalContent'>
                    <iframe width="100%" height="100%" src={`${featuredMovie.sourceUrl}?autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </Modal> : ""}
            <Loader />
            <div className='heroSectionContainer'>
                {MainVideo ? (
                    <iframe width="100%" height="100%" src={`${featuredMovie.sourceUrl}?controls=0&autoplay=1&mute=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                ) : (
                    <img src={featuredMovie.coverImage} alt="banner" />
                )}
                <div className='heroSectionContent'>
                    <img src="/assets/Images/logo.png" alt="logo" />
                    <Link to={`/watch/${featuredMovie?._id}`} className='link'><h1>{featuredMovie?.title}</h1></Link>
                    <p>{featuredMovie?.description}</p>
                    <button className='playBtn' onClick={playVideo}><img className='playBtnImg' src="https://img.icons8.com/sf-black-filled/44/FFFFFF/play.png" /> Play</button>
                </div>
            </div>
        </>
    )
}

export default HeroSection