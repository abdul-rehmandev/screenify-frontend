import React, { useEffect, useState } from 'react'
import "../Styles/PagesStyles/categoriesPage.scss"
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import axios from "axios"
import Loader from '../Components/Loader';
import { useDispatch } from 'react-redux';
import { handleLoader } from '../Redux/loaderSlice';

const CategoriesPage = () => {

    const [category, setCategory] = useState("Action")

    const [allCategories, setAllCategories] = useState([])
    const [showMovies, setShowMovies] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        const fetchData = async () => {
            dispatch(handleLoader(true))
            await axios.get("/category/getAllCategories").then((res) => {
                setAllCategories(res.data.result)
                dispatch(handleLoader(false))
            }).catch((err) => {
                toast.error(err.response.data.message)
                dispatch(handleLoader(false))
            })

            dispatch(handleLoader(true))
            await axios.post("/category/getMoviesAgainstSingleCategory", {
                category
            }).then((res) => {
                setShowMovies(res.data.result)
                dispatch(handleLoader(false))
            }).catch((err) => {
                toast.error(err.response.data.message)
                dispatch(handleLoader(false))
            })
        }
        fetchData();
    }, [category])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Screenify - Categories</title>
            </Helmet>
            <Loader />
            <div className="container-fluid categoryPageContainer">
                <Navbar setActive={2} />

                <div className="container">
                    <div className="row my-3">
                        <div className="col">
                            <select className='categoryInput' onChange={(e) => setCategory(e.target.value)}>
                                {allCategories?.map((item, index) => (
                                    <option value={item.categoryTitle} key={index}>{item.categoryTitle}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row my-1">
                        <div className="col d-flex flex-wrap justify-content-center">
                            {showMovies && showMovies.map((item, index) => (
                                <Link to={`/watch/${item._id}`} className="categoryPageMoviesBox link" key={index}>
                                    <div className='categoryPageMovie'>
                                        <div className="categoryPageMovieImage">
                                            <img src={item.coverImage} alt="banner" />
                                        </div>
                                        <div className="categoryPageMovieName text-center">
                                            {item.title}
                                        </div>
                                        <div className="categoryPageMovieName text-center">
                                            {item.category}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoriesPage