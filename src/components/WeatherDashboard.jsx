import React, { useState, useEffect } from 'react'
import classes from './WeatherDashboard.module.css'
import SearchBar from './SearchBar'
import CurrentWeather from './CurrentWeather'
import FiveDayForecast from './FiveDayForecast'
import { getLatLon } from '../utils/utils'
import Loader from '../UI/Loader'

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchWeather = async (searchTerm) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY

      const { lat, lon } = await getLatLon(searchTerm, apiKey)

      if (lat && lon) {
        setIsLoading(true)
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        )
        const weatherInfo = await weatherResponse.json()
        console.log(weatherInfo)
        setWeatherData(weatherInfo)
        setIsLoading(false)
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
        setIsLoading(true)

        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${apiKey}&units=imperial`
        )
        const forecastInfo = await weatherResponse.json()
        console.log(forecastInfo)
        const dailyForecasts = forecastInfo.list.filter((forecast) => {
          const date = new Date(forecast.dt * 1000)
          const hour = date.getHours()
          return hour >= 12 && hour <= 15 // Filter forecasts between 12 PM and 3 PM
        })

        setForecastData(dailyForecasts)
        setIsLoading(false)
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

  const fetchUserLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      await fetchWeatherByCoordinates(lat, lon)
      await fetchForecastByCoordinates(lat, lon)
    })
  }

  const fetchWeatherByCoordinates = async (lat, lon) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
      )
      const weatherInfo = await weatherResponse.json()
      console.log(weatherInfo)
      setWeatherData(weatherInfo)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  const fetchForecastByCoordinates = async (lat, lon) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${apiKey}&units=imperial`
      )
      const forecastInfo = await weatherResponse.json()
      console.log(forecastInfo)
      const dailyForecasts = forecastInfo.list.filter((forecast) => {
        const date = new Date(forecast.dt * 1000)
        const hour = date.getHours()
        return hour >= 12 && hour <= 15 // Filter forecasts between 12 PM and 3 PM
      })

      setForecastData(dailyForecasts)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  useEffect(() => {
    fetchUserLocationWeather()
  }, [])

  return (
    <div className={classes.weatherDashboard}>
      <h1>Weather</h1>
      <SearchBar onSearch={performSearch} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}

export default WeatherDashboard
