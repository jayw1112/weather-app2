import React from 'react'
import classes from './WeatherDashboard.module.css'
import SearchBar from './SearchBar'

const WeatherDashboard = () => {
  return (
    <div className={classes.weatherDashboard}>
      <h1>Weather</h1>
      <SearchBar />
    </div>
  )
}

export default WeatherDashboard
