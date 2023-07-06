import React from 'react'
import "../Styles/ComponentsStyles/category.scss"
import MovieBox from './MovieBox'

const Category = ({ categoryTitle }) => {

    return (
        <div className='categoryContainer'>
            <h1>{categoryTitle}</h1>
            <div className="categoryBox">
                <MovieBox category={categoryTitle} />
            </div>
        </div>
    )
}

export default Category