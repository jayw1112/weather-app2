import React from 'react'
import classes from './FiveDayForecast.module.css'
import { getWeatherIcon } from '../utils/utils'

const FiveDayForecast = ({ forecastData }) => {
  function formatDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayOfWeek = days[date.getDay()]
    const dayOfMonth = date.getDate()
    const suffix = getOrdinalSuffix(dayOfMonth)

    return `${dayOfWeek} ${dayOfMonth}${suffix}`
  }

  function getOrdinalSuffix(number) {
    const j = number % 10
    const k = number % 100

    if (j === 1 && k !== 11) {
      return 'st'
    }
    if (j === 2 && k !== 12) {
      return 'nd'
    }
    if (j === 3 && k !== 13) {
      return 'rd'
    }

    return 'th'
  }

  return (
    <div className={classes.forecastContainer}>
      <h3>Five Day Forecast:</h3>
      <div className={classes.dayContainers}>
        {forecastData &&
          forecastData.map((day, index) => {
            const date = new Date(day.dt * 1000)
            const formattedDate = formatDate(date)

            return (
              <div className={classes.dayContainer} key={index}>
                <h4 className={classes.day}>{formattedDate}</h4>
                <p className={classes.temp}>{Math.round(day.main.temp)}°F</p>
                <i className={getWeatherIcon(day.weather[0].icon)}></i>
                <p className={classes.main}>{day.weather[0].main}</p>
                {/* <p>Min: {Math.round(day.main.temp_min)}°F</p>
              <p>Max: {Math.round(day.main.temp_max)}°F</p> */}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default FiveDayForecast
