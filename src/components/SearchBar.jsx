import React from 'react'
import classes from './SearchBar.module.css'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching...')
  }

  return (
    <div className={classes.searchContainer}>
      <form onSubmit={handleSearch} action='' method='get'>
        <input type='text' id='search' placeholder='Search' name='search' />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
