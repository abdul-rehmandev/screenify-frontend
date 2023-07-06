import React, { useEffect } from 'react'
import "../Styles/ComponentsStyles/loader.scss"
import { useSelector } from 'react-redux'

const Loader = () => {

    const loader = useSelector(state => state?.loader?.loader)

    useEffect(() => {
        if (loader == true) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    })

    return (
        <div>
            {loader ? (
                <div className='loader-container'>
                    <img src="/assets/Images/favicon.png" alt="loader" width={100} className='loaderImage' />
                </div>
            ) : ""}
        </div>

    )
}

export default Loader