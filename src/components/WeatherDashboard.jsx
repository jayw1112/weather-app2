import React, { useState, useEffect } from 'react'
import classes from './WeatherDashboard.module.css'
import SearchBar from './SearchBar'
import CurrentWeather from './CurrentWeather'
import FiveDayForecast from './FiveDayForecast'

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)

  const fetchWeather = async (searchTerm) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY
      let response

      // Check if searchTerm is a zip code (consisting only of digits)
      if (/^\d+$/.test(searchTerm)) {
        response = await fetch(
          `http://api.openweathermap.org/geo/1.0/zip?zip=${searchTerm},US&appid=${apiKey}`
        )
      } else {
        response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${apiKey}`
        )
      }
      const data = await response.json()
      console.log(data)

      let lat, lon
      if (/^\d+$/.test(searchTerm)) {
        // Zip code search
        lat = data.lat
        lon = data.lon
      } else {
        // City name search
        if (data.length > 0) {
          lat = data[0].lat
          lon = data[0].lon
        }
      }

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
      let response

      // Check if searchTerm is a zip code (consisting only of digits)
      if (/^\d+$/.test(searchTerm)) {
        response = await fetch(
          `http://api.openweathermap.org/geo/1.0/zip?zip=${searchTerm},US&appid=${apiKey}`
        )
      } else {
        response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${apiKey}`
        )
      }
      const data = await response.json()
      console.log(data)

      let lat, lon
      if (/^\d+$/.test(searchTerm)) {
        // Zip code search
        lat = data.lat
        lon = data.lon
      } else {
        // City name search
        if (data.length > 0) {
          lat = data[0].lat
          lon = data[0].lon
        }
      }

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
