import React, { useEffect, useState } from 'react'
import "../Styles/ComponentsStyles/categories.scss"
import Category from './Category'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { handleLoader } from '../Redux/loaderSlice'
import Loader from './Loader'

const Categories = () => {

    const dispatch = useDispatch();

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            dispatch(handleLoader(true))
            await axios.get("/category/getAllCategories").then((res) => {
                setCategories(res.data.result)
                dispatch(handleLoader(false))
            }).catch((err) => {
                dispatch(handleLoader(false))
                console.log(err.response.data.message)
            })
        }
        fetchData();
    }, [])

    return (
        <>
            <Loader />
            <div className="container-fluid">
                {categories?.map((item, index) => (
                    <Category categoryTitle={item.categoryTitle} key={index} />
                ))}
            </div>
        </>
    )
}

export default Categories