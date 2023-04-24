import React from 'react'
import classes from './CurrentWeather.module.css'
import { getWeatherIcon } from '../utils/utils'

const CurrentWeather = ({ location, temp, description, humidity, icon }) => {
  return (
    <div className={classes.currentContainer}>
      <h2>Current Weather:</h2>
      <h3 className={classes.location}>{location}</h3>
      <p className={classes.temp}>{Math.round(temp)} F°</p>
      <p className={classes.description}>{description}</p>
      <i className={getWeatherIcon(icon)}></i>
      <p className={classes.humidity}>Humidity: {humidity} %</p>
    </div>
  )
}

export default CurrentWeather
