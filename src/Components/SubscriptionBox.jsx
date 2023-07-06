import React from 'react'
import "../Styles/ComponentsStyles/subscriptionBox.scss"

const SubscriptionBox = ({ setShowModal, setSusbcriptionId, setSubscriptionPlanPrice, data }) => {

    const handleSubscription = (data) => {
        setSusbcriptionId(data._id)
        setSubscriptionPlanPrice(data.price)
        setShowModal(false)
    }

    return (
        <div className='subscriptionBox'>
            <h2>{data.title}</h2>
            <ul className='text-start'>
                {data.perks.map((item, index) => (
                    <li key={index}>
                        {item}
                    </li>
                ))}
            </ul>
            <button className='subscribeBtn' onClick={() => handleSubscription(data)}>Continue</button>
        </div>
    )
}

export default SubscriptionBox