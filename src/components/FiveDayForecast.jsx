import React from 'react'
import classes from './FiveDayForecast.module.css'
import { getWeatherIcon } from '../utils/utils'

const FiveDayForecast = ({ forecastData }) => {
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
