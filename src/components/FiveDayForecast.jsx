import React from 'react'
import classes from './FiveDayForecast.module.css'

const FiveDayForecast = ({ forecastData, day, min, max, icon }) => {
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
    <div className={classes.forecastContainer}>
      <h2>Five Day Forecast:</h2>
      {forecastData &&
        forecastData.map((day, index) => {
          const date = new Date(day.dt * 1000)
          const formattedDate = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`

          return (
            <div className={classes.dayContainer} key={index}>
              <h3 className={classes.day}>{formattedDate}</h3>
              <i className={getWeatherIcon(day.weather[0].icon)}></i>

              <p>{Math.round(day.main.temp)}°F</p>
              {/* <p>Min: {Math.round(day.main.temp_min)}°F</p>
              <p>Max: {Math.round(day.main.temp_max)}°F</p> */}
              <p>{day.weather[0].main}</p>
            </div>
          )
        })}
    </div>
  )
}

export default FiveDayForecast
