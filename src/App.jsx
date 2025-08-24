
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import WeatherDashboard from './components/WeatherDashboard'
import WeatherMap from './components/WeatherMap'
import AIChat from './components/AIChat'
import EmergencyMode from './components/EmergencyMode'
import { weatherAPI } from './services/weatherAPI'
import './App.css'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [location, setLocation] = useState({ lat: 40.7128, lon: -74.0060, name: 'New York' })
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lon: longitude, name: 'Your Location' })
          await fetchWeatherData(latitude, longitude)
        },
        () => {
          // Fallback to default location
          fetchWeatherData(location.lat, location.lon)
        }
      )
    } else {
      fetchWeatherData(location.lat, location.lon)
    }
  }, [])

  const fetchWeatherData = async (lat, lon) => {
    try {
      setLoading(true)
      const [weather, forecastData] = await Promise.all([
        weatherAPI.getCurrentWeather(lat, lon),
        weatherAPI.getForecast(lat, lon)
      ])
      setCurrentWeather(weather)
      setForecast(forecastData)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
    fetchWeatherData(newLocation.lat, newLocation.lon)
  }

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Header 
          location={location} 
          onLocationChange={handleLocationChange}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        
        <Routes>
          <Route path="/" element={
            <WeatherDashboard 
              currentWeather={currentWeather}
              forecast={forecast}
              loading={loading}
              location={location}
            />
          } />
          <Route path="/map" element={
            <WeatherMap 
              location={location}
              onLocationChange={handleLocationChange}
            />
          } />
          <Route path="/chat" element={
            <AIChat currentWeather={currentWeather} />
          } />
          <Route path="/emergency" element={
            <EmergencyMode location={location} />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
