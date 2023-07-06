import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminComponents/AdminNavbar'
import "../../Styles/ComponentsStyles/admincategory.scss"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const AdminCategory = () => {

    const [categoryTitle, setCategoryTitle] = useState("")

    const [categories, setCategories] = useState([])

    const createCategory = async () => {
        await axios.post("/category/create", {
            categoryTitle
        }).then((res) => {
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("/admin/getCategories").then((res) => {
                setCategories(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }

        fetchData();
    }, [])

    return (
        <div className="container adminCategoryContainer">
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
                <AdminNavbar setLink={2} />
            </div>
            <div className="row">
                <h1>Add A Category</h1>
                <div className="col">
                    <input type="text" placeholder='Category Title' onChange={(e) => setCategoryTitle(e.target.value)} />
                    <div className='text-center mt-1'>
                        <img src="https://img.icons8.com/pulsar-line/34/null/plus.png" onClick={createCategory} />
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>Categories</h1>
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.categoryTitle}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminCategory