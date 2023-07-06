import React, { useEffect, useState } from 'react'
import "../Styles/ComponentsStyles/movieBox.scss"
import { Link } from 'react-router-dom'
import Modal from './Modal'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { handleCurrentSourceUrl } from '../Redux/SourceUrlSlice'

const MovieBox = ({ category }) => {
    const [showModal, setShowModal] = useState(false)
    const [movieList, setMovieList] = useState([])

    const sourceUrl = useSelector(state => state?.sourceUrl?.currentSourceUrl)

    const dispatch = useDispatch()

    const handleModal = async (url, id) => {

        await axios.put("/movie/view", {
            movieId: id
        }).then((res) => {
            console.log(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })

        setShowModal(true)
        dispatch(handleCurrentSourceUrl(url))
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
            await axios.post("/category/getMoviesAgainstSingleCategory", {
                category
            }).then((res) => {
                setMovieList(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }
        fetchData();

    }, [showModal])

    return (
        <>
            {showModal ? <Modal setShowModal={setShowModal}>
                <div className='MovieBoxModalContent'>
                    <iframe width="100%" height="100%" src={`${sourceUrl}?autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </Modal> : ""}
            {movieList?.map((item, index) => (
                <div key={index} className='movieBox link'>
                    <div className="movieCover">
                        <img src={item.coverImage} alt="cover" />
                    </div>
                    <Link to={`/watch/${item._id}`} className='link'><div className="movieName">{item.title}</div></Link>
                    <span className="movieDescription">
                        <p>
                            {item.description}
                        </p>
                    </span>
                    <div className="movieButtons">
                        <img src="https://img.icons8.com/sf-black-filled/30/null/play.png" onClick={() => handleModal(item.sourceUrl, item._id)} />
                        <img src="https://img.icons8.com/ios-glyphs/30/null/info--v1.png" />
                    </div>
                </div>
            ))}
        </>
    )
}

export default MovieBox