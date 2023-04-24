import React, { useState, useEffect } from 'react'
import classes from './WeatherDashboard.module.css'
import SearchBar from './SearchBar'
import CurrentWeather from './CurrentWeather'
import FiveDayForecast from './FiveDayForecast'
import { getLatLon } from '../utils/utils'

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)

  const fetchWeather = async (searchTerm) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY

      const { lat, lon } = await getLatLon(searchTerm, apiKey)

      if (lat && lon) {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        )
        const weatherInfo = await weatherResponse.json()
        console.log(weatherInfo)
        setWeatherData(weatherInfo)
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  const fetchForecast = async (searchTerm) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY

      const { lat, lon } = await getLatLon(searchTerm, apiKey)

      if (lat && lon) {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${apiKey}&units=imperial`
        )
        const forecastInfo = await weatherResponse.json()
        console.log(forecastInfo)
        const dailyForecasts = forecastInfo.list.filter(
          (_, index) => (index - 4) % 8 === 0
        )

        setForecastData(dailyForecasts)
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }
  const performSearch = (searchTerm) => {
    console.log(`Searching for ${searchTerm}...`)
    fetchWeather(searchTerm)
    fetchForecast(searchTerm)
  }

  return (
    <div className={classes.weatherDashboard}>
      <h1>Weather</h1>
      <SearchBar onSearch={performSearch} />
      {weatherData && (
        <CurrentWeather
          location={weatherData.name}
          temp={weatherData.main.temp}
          description={weatherData.weather[0].description}
          humidity={weatherData.main.humidity}
          icon={weatherData.weather[0].icon}
        />
      )}
      {forecastData && <FiveDayForecast forecastData={forecastData} />}
    </div>
  )
}

export default WeatherDashboard
