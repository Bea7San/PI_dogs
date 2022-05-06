import React, { useState } from "react";

const SearchBar = (props) => {
    const [breed, setBreed] = useState('')

    function handleChange(e) {
        setBreed(e.target.value)
        props.handleSearch(e)
        
    }
    return (
        <input
            type='text'
            placeholder='Search by name...'
            value={breed}
            onChange={e => handleChange(e)}
        />
    )
}
export default SearchBar;