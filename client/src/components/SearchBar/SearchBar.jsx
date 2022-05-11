import React, { useState } from "react";
import './searchBar.css'

const SearchBar = (props) => {
    

    function handleChange(e) {
        props.handleSearch(e)
        
    }
    return (
        <input
            type='search'
            placeholder='Search by name...'
            value={props.breedName}
            onChange={e => handleChange(e)}
            className='searchBar'
        />
    )
}
export default SearchBar;