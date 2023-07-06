import React, { useState } from 'react'
import "../Styles/PagesStyles/login.scss"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { handleCurrentUser, handleUserStatus } from '../Redux/userSlice'
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        await axios.post("/auth/login", {
            email,
            password
        }).then((res) => {
            console.log(res.data)
            dispatch(handleCurrentUser(res.data.result))
            dispatch(handleUserStatus(1))
            toast.success(res.data.message)
            navigate("/home")
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <div className="container loginContainer">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="row">
                <div className="col text-center">
                    <img src="/assets/Images/logo.png" alt="Logo" width={200} />
                </div>
            </div>
            <div className='loginFormBox'>
                <div className='loginBox text-center'>
                    <h1><img src="https://img.icons8.com/pulsar-line/64/null/login-rounded-right.png" /></h1>
                    <div className='inputBox'>
                        <img src="https://img.icons8.com/pulsar-line/34/null/secured-letter.png" />
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='inputBox'>
                        <img src="https://img.icons8.com/pulsar-line/34/null/password.png" />
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button onClick={handleLogin}>Login</button>
                    <p>Don't have an account? <Link to="/register" className='link'>SignUp</Link></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage