import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminComponents/AdminNavbar'
import "../../Styles/ComponentsStyles/adminUsers.scss"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const AdminUsers = () => {

    const [users, setUsers] = useState([])
    const [accounts, setAccounts] = useState([])

    const [message, setMessage] = useState("")

    const sendMessage = async (userId) => {
        await axios.post("/notification/send", {
            userId,
            message
        }).then((res) => {
            toast.success(res.data.message)
            setMessage("")
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("/admin/getUsers").then((res) => {
                setUsers(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })

            await axios.get("/admin/getAccounts").then((res) => {
                setAccounts(res.data.result)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }

        fetchData();
    }, [])

    const joinedData = users.map((user) => ({
        ...user,
        user_account: accounts.filter((account) => account.userId === user._id)
    }));

    return (
        <div className="container adminUsersContainer">
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
                <AdminNavbar setLink={4} />
            </div>
            <div className="row">
                <h1>Registered Users</h1>
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Subscribed Plan</th>
                                <th scope="col">Send Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {joinedData.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.user_account.map((account) => (
                                        account.payment_intent
                                    ))}</td>
                                    <td className='sendMessageBox'>
                                        <textarea cols="30" rows="3" onChange={(e) => setMessage(e.target.value)}></textarea>
                                        <img src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/34/null/external-send-email-interface-anggara-basic-outline-anggara-putra.png" onClick={() => { sendMessage(item._id) }} />
                                    </td>
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