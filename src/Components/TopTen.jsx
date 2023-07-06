import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import "../Styles/ComponentsStyles/topten.scss"

const TopTen = () => {

    const [topMovies, setTopMovies] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("/movie/top").then((res) => {
                setTopMovies(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }

        fetchData();
    }, [])

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className='topMoviesContainer p-3'>
                <h1>Top Watched</h1>
                <div className="topMoviesBox">
                    {topMovies?.map((item, index) => (
                        <Link to={`/watch/${item._id}`} className='topMovieBox link'>
                            <span>{index + 1}</span>
                            <img src={item.coverImage} alt={item.title} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TopTen