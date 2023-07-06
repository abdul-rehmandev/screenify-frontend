import React, { useEffect, useState } from 'react'
import "../Styles/PagesStyles/signup.scss"
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Components/Modal'
import SubscriptionBox from '../Components/SubscriptionBox'
import axios from 'axios'

const SignupPage = () => {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false)

    const [subscriptions, setSubscriptions] = useState([])

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("https://img.icons8.com/pulsar-line/64/null/user-male-circle.png")

    const [susbcriptionId, setSusbcriptionId] = useState("")
    const [subscriptionPlanPrice, setSubscriptionPlanPrice] = useState("")

    const createUser = async () => {
        await axios.post("/auth/create", {
            username,
            email,
            password,
            profileImage
        }).then((res) => {
            console.log(res.data.result)
            axios.post("/account/create", {
                userId: res.data.result._id,
                subscriptionPlanId: susbcriptionId,
                subscriptionPlanPrice: subscriptionPlanPrice
            }).then((res) => {
                console.log(res.data.result)
                navigate("/")
            }).catch((err) => {
                console.log(err.response.data.message)
            })
        }).catch((err) => {
            console.log(err.response.data.message)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("/subscription/getAllSubscriptions").then((res) => {
                setSubscriptions(res.data.result)
            }).catch((err) => {
                console.log(err.response.data.message)
            })
        }

        fetchData();
    }, [])


    return (
        <>
            {showModal ? <Modal setShowModal={setShowModal}>
                <div className='SignupModalContent'>
                    <img src="/assets/Images/logo.png" alt="logo" width={200} />
                    <h1>Choose a subscription plan.</h1>
                    <div className='subscriptionOuterBox'>
                        {subscriptions.map((item, index) => (
                            <SubscriptionBox setShowModal={setShowModal} setSusbcriptionId={setSusbcriptionId} setSubscriptionPlanPrice={setSubscriptionPlanPrice} key={index} data={item} />
                        ))}
                    </div>
                </div>
            </Modal> : ""}
            <div className="container signUpContainer">
                <div className="row">
                    <div className="col text-center">
                        <img src="/assets/Images/logo.png" alt="Logo" width={200} />
                    </div>
                </div>
                <div className='signUpFormBox'>
                    <div className='signUpBox text-center'>
                        {subscriptionPlanPrice === "" ? (
                            <>
                                <h1><img src="https://img.icons8.com/pulsar-line/64/null/user-male-circle.png" /></h1>
                                <div className='inputBox'>
                                    <img src="https://img.icons8.com/pulsar-line/34/null/name.png" />
                                    <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className='inputBox'>
                                    <img src="https://img.icons8.com/pulsar-line/34/null/secured-letter.png" />
                                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='inputBox'>
                                    <img src="https://img.icons8.com/pulsar-line/34/null/password.png" />
                                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button onClick={() => setShowModal(true)}>Continue</button>
                                <p>Already have an account? <Link to="/" className='link'>Login</Link></p>
                            </>
                        ) : (
                            <div className='confirmationSignup'>
                                <h1 className='text-center'>Confirmation</h1>
                                <span>Email: <b>{email}</b></span>
                                <span>Subscription plan : {subscriptionPlanPrice} ~Rs per month</span>
                                <button className='mb-2' onClick={createUser}>Confirm</button>
                                <button onClick={() => setSubscriptionPlanPrice("")}>Cancel</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage