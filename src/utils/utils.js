export const getWeatherIcon = (iconCode) => {
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

export const getLatLon = async (searchTerm, apiKey) => {
  let response

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

  let lat, lon
  if (/^\d+$/.test(searchTerm)) {
    lat = data.lat
    lon = data.lon
  } else {
    if (data.length > 0) {
      lat = data[0].lat
      lon = data[0].lon
    }
  }

  return { lat, lon }
}
