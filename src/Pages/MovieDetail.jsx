import React, { useEffect, useState } from 'react'
import "../Styles/PagesStyles/movieDetail.scss"
import Navbar from "../Components/Navbar.jsx"
import { Helmet } from "react-helmet";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { handleLoader } from '../Redux/loaderSlice';
import Loader from '../Components/Loader';

const MovieDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const [movie, setMovie] = useState("")

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        const fetchData = async () => {
            dispatch(handleLoader(true))
            await axios.put("/movie/view", {
                movieId: id
            }).then((res) => {
                console.log(res.data.message)
                dispatch(handleLoader(false))
            }).catch((err) => {
                dispatch(handleLoader(false))
                toast.error(err.response.data.message)
            })

            dispatch(handleLoader(true))
            await axios.get(`/movie/single/${id}`).then((res) => {
                setMovie(res.data.result)
                dispatch(handleLoader(false))
            }).catch((err) => {
                dispatch(handleLoader(false))
                toast.error(err.response.data.message)
            })
        }

        fetchData()
    }, [])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Screenify - ${movie?.title}`}</title>
            </Helmet>
            <Loader />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="container-fluid p-0 movieDetailContainer">
                <Navbar />
                <div className='watchBox'>
                    <iframe width="100%" height="100%" src={`${movie.sourceUrl}?autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="movieDetailBox">
                    <h1 style={{ backgroundImage: `url(${movie.coverImage})` }}>{movie.title}</h1>
                    <p>{movie.description}</p>
                </div>
                <div className="aboutMovie">
                    <div className='aboutMovieBox'>
                        <h2>Total Watched</h2>
                        <h4><span>{movie.watchedTimes}</span> times</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail