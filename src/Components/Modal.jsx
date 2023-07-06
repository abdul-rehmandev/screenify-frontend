import React from 'react'
import "../Styles/ComponentsStyles/modal.scss"

const Modal = ({ children, setShowModal }) => {
    return (
        <div className='modalBox'>
            <img src="https://img.icons8.com/pulsar-line/34/null/delete-sign.png" className='modalCrossBtn' onClick={() => setShowModal(false)} />
            {children}
        </div>
    )
}

export default Modal