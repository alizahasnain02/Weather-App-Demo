
import React from 'react'
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun } from 'lucide-react'
import WeatherChart from './WeatherChart'
import AQIDisplay from './AQIDisplay'
import './WeatherDashboard.css'

const WeatherDashboard = ({ currentWeather, forecast, loading, location }) => {
  if (loading) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading weather data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!currentWeather) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="error-message">
            <p>Unable to load weather data. Please try again.</p>
          </div>
        </div>
      </div>
    )
  }

  const getWeatherEmoji = (description) => {
    const desc = description.toLowerCase()
    if (desc.includes('rain')) return '🌧️'
    if (desc.includes('cloud')) return '☁️'
    if (desc.includes('sun') || desc.includes('clear')) return '☀️'
    if (desc.includes('snow')) return '❄️'
    if (desc.includes('thunder')) return '⛈️'
    return '🌤️'
  }

  const weatherDetails = [
    {
      icon: Thermometer,
      label: 'Feels Like',
      value: `${Math.round(currentWeather.feels_like)}°C`,
      color: '#e74c3c'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${currentWeather.humidity}%`,
      color: '#3498db'
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${Math.round(currentWeather.wind_speed)} m/s`,
      color: '#95a5a6'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${(currentWeather.visibility / 1000).toFixed(1)} km`,
      color: '#9b59b6'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${currentWeather.pressure} hPa`,
      color: '#f39c12'
    },
    {
      icon: Sun,
      label: 'UV Index',
      value: currentWeather.uvi || 'N/A',
      color: '#ff6b6b'
    }
  ]

  return (
    <div className="main-content">
      <div className="container">
        <div className="weather-dashboard">
          {/* Main Weather Card */}
          <div className="main-weather-card card">
            <div className="weather-header">
              <div className="weather-main">
                <div className="weather-icon">
                  {getWeatherEmoji(currentWeather.description)}
                </div>
                <div className="weather-temp">
                  <span className="temp-value">{Math.round(currentWeather.temp)}</span>
                  <span className="temp-unit">°C</span>
                </div>
              </div>
              <div className="weather-info">
                <h2 className="location-name">{location.name}</h2>
                <p className="weather-description">{currentWeather.description}</p>
                <p className="temp-range">
                  H: {Math.round(currentWeather.temp_max)}° L: {Math.round(currentWeather.temp_min)}°
                </p>
              </div>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="weather-details-grid">
            {weatherDetails.map((detail, index) => (
              <div key={index} className="weather-detail-card card">
                <div className="detail-header">
                  <detail.icon size={24} style={{ color: detail.color }} />
                  <span className="detail-label">{detail.label}</span>
                </div>
                <div className="detail-value">{detail.value}</div>
              </div>
            ))}
          </div>

          {/* Charts and AQI */}
          <div className="charts-section">
            <div className="chart-container card">
              <h3>7-Day Forecast</h3>
              <WeatherChart forecast={forecast} />
            </div>
            
            <div className="aqi-container card">
              <AQIDisplay location={location} />
            </div>
          </div>

          {/* Quick Forecast */}
          <div className="quick-forecast card">
            <h3>Hourly Forecast</h3>
            <div className="hourly-forecast">
              {forecast.slice(0, 8).map((item, index) => (
                <div key={index} className="hourly-item">
                  <div className="hour">{new Date(item.dt * 1000).getHours()}:00</div>
                  <div className="hour-weather">
                    {getWeatherEmoji(item.weather[0].description)}
                  </div>
                  <div className="hour-temp">{Math.round(item.main.temp)}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDashboard
