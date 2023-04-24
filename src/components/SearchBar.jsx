import React, { useState } from 'react'
import classes from './SearchBar.module.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className={classes.searchContainer}>
      <form onSubmit={handleSearch} action='' method='get'>
        <input
          type='text'
          id='search'
          placeholder='Search Location'
          name='search'
          value={searchTerm}
          onChange={handleInput}
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
