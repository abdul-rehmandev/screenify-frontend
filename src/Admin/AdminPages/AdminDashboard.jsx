import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminComponents/AdminNavbar'
import "../../Styles/ComponentsStyles/adminmain.scss"
import axios from 'axios'

const AdminDashboard = () => {

    const [users, setUsers] = useState([])
    const [movies, setMovies] = useState([])
    const [categories, setCategories] = useState([])
    const [subscriptions, setSubscriptions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("/admin/getUsers").then((res) => {
                setUsers(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })

            await axios.get("/admin/getMovies").then((res) => {
                setMovies(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })

            await axios.get("/admin/getCategories").then((res) => {
                setCategories(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })

            await axios.get("/admin/getSubscriptions").then((res) => {
                setSubscriptions(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }

        fetchData();
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <img src="/assets/Images/logo.png" alt="logo" width={200} />
                </div>
            </div>
            <div className="row">
                <AdminNavbar setLink={1} />
            </div>
            <div className="row">
                <div className="col">
                    <div className='adminMainContainer'>
                        <div className="mainBox">
                            <h4>Active Users</h4>
                            <span>{users.length}</span>
                        </div>
                        <div className="mainBox">
                            <h4>Total Categories</h4>
                            <span>{categories.length}</span>
                        </div>
                        <div className="mainBox">
                            <h4>Total Movies</h4>
                            <span>{movies.length}</span>
                        </div>
                        <div className="mainBox">
                            <h4>Subscriptions Plans</h4>
                            <span>{subscriptions.length}</span>
                        </div>
                        <div className="mainBox">
                            <h4>Total Balance</h4>
                            <span>{subscriptions.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard