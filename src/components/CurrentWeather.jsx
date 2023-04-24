import React from 'react'
import classes from './CurrentWeather.module.css'

const CurrentWeather = ({ location, temp, description, icon }) => {
  return (
    <div className={classes.currentContainer}>
      Current Weather
      {location}
      {temp}
      {description}
      {icon}
    </div>
  )
}

export default CurrentWeather
