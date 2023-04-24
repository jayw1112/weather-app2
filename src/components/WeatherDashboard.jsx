import React from 'react'
import classes from './WeatherDashboard.module.css'
import SearchBar from './SearchBar'
import CurrentWeather from './CurrentWeather'

const WeatherDashboard = () => {
  const performSearch = (searchTerm) => {
    console.log(`Searching for ${searchTerm}...`)
  }
  return (
    <div className={classes.weatherDashboard}>
      <h1>Weather</h1>
      <SearchBar onSearch={performSearch} />
      <CurrentWeather />
    </div>
  )
}

export default WeatherDashboard
