import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminComponents/AdminNavbar'
import "../../Styles/ComponentsStyles/adminmovies.scss"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const AdminUsers = () => {

    const [movies, setMovies] = useState([])
    const [allCategories, setAllCategories] = useState([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [sourceUrl, setsourceUrl] = useState("")
    const [coverImage, setCoverImage] = useState(null)
    const [category, setCategory] = useState("Action")

    const handleProfileImage = async (e) => {
        const file = e.target.files[0]

        if (file === undefined) { toast.error('Please select an image') }

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "screenify");
        data.append("cloud_name", "dewllu3t9");

        await fetch("https://api.cloudinary.com/v1_1/dewllu3t9/image/upload", {
            method: "post",
            body: data
        }).then((res) => res.json()).then((data) => {
            setCoverImage(data.url.toString());
            toast.success('Profile image uploaded')
        }).catch((err) => {
            console.log(err)
            toast.error('Profile image uploaded failed')
        })
    }

    const createMovie = async () => {
        await axios.post("/movie/create", {
            title,
            description,
            coverImage,
            sourceUrl,
            category
        }).then((res) => {
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }


    useEffect(() => {
        const fetchData = async () => {
            await axios.get("/admin/getMovies").then((res) => {
                setMovies(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })

            await axios.get("/category/getAllCategories").then((res) => {
                setAllCategories(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }

        fetchData();
    }, [])

    const handleDelete = async (id) => {
        await axios.post("/admin/deleteMovie", {
            movieId: id
        }).then((res) => {
            setMovies(res.data.result)
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <div className="container adminMoviesContainer">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="row">
                <div className="col text-center">
                    <img src="/assets/Images/logo.png" alt="logo" width={200} />
                </div>
            </div>
            <div className="row">
                <AdminNavbar setLink={3} />
            </div>
            <div className="row">
                <h1>Add a movie</h1>
                <div className="col adminMovieAddBox">
                    <input type="file" onChange={handleProfileImage} />
                    <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                    <textarea cols="30" rows="4" placeholder='Description' onChange={(e) => setDescription(e.target.value)}></textarea>
                    <select className='categoryInput' onChange={(e) => setCategory(e.target.value)}>
                        {allCategories?.map((item, index) => (
                            <>
                                <option value={item.categoryTitle} key={index}>{item.categoryTitle}</option>
                            </>
                        ))}
                    </select>
                    <input type="text" placeholder='Source Url' onChange={(e) => setsourceUrl(e.target.value)} />
                    <div className='text-center mt-1'>
                        <img src="https://img.icons8.com/pulsar-line/34/null/plus.png" className='addMovieBtn' onClick={createMovie} />
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>Active Movies</h1>
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Views</th>
                                <th scope="col">Featured</th>
                                <th scope="col">Cover Image</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>{item.watchedTimes}</td>
                                    <td>{item.isFeatured === true ? "Active" : "Not Active"}</td>
                                    <td><img src={item.coverImage} alt={item.coverImage} width={80} /></td>
                                    <td><img src="https://img.icons8.com/pulsar-line/34/null/delete-forever.png" className='adminMovieDeleteIcon' onClick={() => handleDelete(item._id)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminUsers