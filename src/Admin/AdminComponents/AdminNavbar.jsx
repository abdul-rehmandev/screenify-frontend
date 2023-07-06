import React from 'react'
import { Link } from 'react-router-dom'
import "../../Styles/ComponentsStyles/adminnavbar.scss"

const AdminNavbar = ({ setLink }) => {
    return (
        <div className='adminNavbarContainer'>
            <Link to="/adminDashboard" className={`link ${setLink == 1 ? "active" : ""}`}>Home</Link>
            <Link to="/adminCategory" className={`link ${setLink == 2 ? "active" : ""}`}>Manage Categories</Link>
            <Link to="/adminMovies" className={`link ${setLink == 3 ? "active" : ""}`}>Manage Movies</Link>
            <Link to="/adminUsers" className={`link ${setLink == 4 ? "active" : ""}`}>Manage Users</Link>
            <Link to="/home" className={`link`}>Back To Screenify</Link>
        </div>
    )
}

export default AdminNavbar