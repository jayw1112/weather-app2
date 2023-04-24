import React from 'react'
import classes from './CurrentWeather.module.css'

const CurrentWeather = ({ location, temp, description, humidity }) => {
  return (
    <div className={classes.currentContainer}>
      <h2>Current Weather:</h2>
      <h3 className={classes.location}>{location}</h3>
      <p className={classes.temp}>{Math.round(temp)} F°</p>
      <p className={classes.description}>{description}</p>
      <p className={classes.humidity}>{humidity} %</p>
    </div>
  )
}

export default CurrentWeather
