import React from 'react'
import classes from './CurrentWeather.module.css'

const CurrentWeather = ({ location, temp, description, humidity, icon }) => {
  const getWeatherIcon = (iconCode) => {
    const iconMapping = {
      '01d': 'wi-day-sunny',
      '01n': 'wi-night-clear',
      '02d': 'wi-day-cloudy',
      '02n': 'wi-night-cloudy',
      '03d': 'wi-cloud',
      '03n': 'wi-cloud',
      '04d': 'wi-cloudy',
      '04n': 'wi-cloudy',
      '09d': 'wi-showers',
      '09n': 'wi-showers',
      '10d': 'wi-day-rain',
      '10n': 'wi-night-rain',
      '11d': 'wi-day-thunderstorm',
      '11n': 'wi-night-thunderstorm',
      '13d': 'wi-day-snow',
      '13n': 'wi-night-snow',
      '50d': 'wi-day-fog',
      '50n': 'wi-night-fog',
    }

    return `wi ${iconMapping[iconCode]}`
  }

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
